/* eslint-disable */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SpotlightCard from './SpotlightCard.jsx';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    
    // Get initial size immediately
    const initialRect = ref.current.getBoundingClientRect();
    setSize({ width: initialRect.width, height: initialRect.height });
    
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

function Masonry({
  items = [],
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  spotlightColor = 'rgba(0, 229, 255, 0.5)'
}) {
  console.log('Masonry received items:', items);
  
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item, index) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    if (!items || items.length === 0) {
      console.log('No items to preload');
      setImagesReady(true);
      return;
    }
    console.log('Preloading images for', items.length, 'items');
    preloadImages(items.map(i => i.imgSrc)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    console.log('Grid calculation - width:', width, 'items:', items?.length);
    if (!width) return [];
    if (!items || items.length === 0) return [];

    const columnWidth = width / columns;
    const gap = 20;
    
    // Define base heights for masonry effect
    const baseHeights = [180, 220, 200, 240, 190, 210];
    
    // Track items in each column
    const columnItems = Array.from({ length: columns }, () => []);
    const colHeights = new Array(columns).fill(0);
    
    // First pass: assign items to columns
    items.forEach((child, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const height = baseHeights[index % baseHeights.length];
      
      columnItems[col].push({
        ...child,
        col,
        height,
        index
      });
      
      colHeights[col] += height + gap;
    });
    
    // Find target height (tallest column)
    const targetHeight = Math.max(...colHeights);
    
    // Second pass: adjust heights to fill gaps
    columnItems.forEach((items, col) => {
      if (items.length === 0) return;
      
      const currentHeight = items.reduce((sum, item) => sum + item.height + gap, 0);
      const deficit = targetHeight - currentHeight;
      
      if (deficit > 20) { // If there's a significant gap
        // Distribute extra height evenly across all items in this column
        const extraHeightPerItem = Math.floor(deficit / items.length);
        items.forEach(item => {
          item.height += extraHeightPerItem;
        });
      }
    });
    
    // Third pass: calculate final positions
    const gridItems = [];
    columnItems.forEach((items, col) => {
      let currentY = 0;
      items.forEach(item => {
        const x = (columnWidth * col) + (gap / 2);
        const y = currentY;
        
        gridItems.push({
          ...item,
          x,
          y,
          w: columnWidth - gap,
          h: item.height
        });
        
        currentY += item.height + gap;
      });
    });

    console.log('Grid items calculated:', gridItems.length);
    console.log('Final column heights:', columnItems.map((items, col) => 
      items.reduce((sum, item) => sum + item.height + gap, 0)
    ));
    
    return gridItems;
  }, [columns, items, width]);

  // Calculate container height based on tallest column
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 400;
    const maxY = Math.max(...grid.map(item => item.y + item.h));
    return maxY + 40; // Add bottom padding
  }, [grid]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: `${containerHeight}px` }}>
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="masonry-item-wrapper"
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <SpotlightCard
              imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
              title={item.title}
              spotlightColor={spotlightColor}
              className="masonry-spotlight-card"
            />
            {colorShiftOnHover && (
              <div
                className="color-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                  opacity: 0,
                  pointerEvents: 'none',
                  borderRadius: '1.5rem'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Masonry;
