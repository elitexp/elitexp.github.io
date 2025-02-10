<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded" id="app">
      <LandingPage :user="user" />
      <Description :user="user" :content="description" :links="links" />
      <Experience :content="experiences" />
      <Skills :content="skills" />
      <Projects :content="projects" />
      <Footer :user="user" :links="links" />
    </div>
  </transition>
</template>

<script>
import LandingPage from "./components/LandingPage.vue";
import Description from "./components/Description.vue";
import Experience from "./components/Experience.vue";
import Skills from "./components/Skills.vue";
import Projects from "./components/Projects.vue";
import Footer from "./components/Footer.vue";

import { cosmic } from "./cosmic.js";

export default {
  name: "App",
  components: {
    LandingPage,
    Description,
    Experience,
    Skills,
    Projects,
    Footer,
  },
  data: () => ({
    isLoaded: false,
    user: {},
    description: {},
    links: {},
    experiences: {},
    skills: {},
    projects: {},
  }),
  methods: {
    async fetchObject(slug) {
      return await cosmic.objects.findOne({
        type: slug,
        slug: slug
      }).props("slug,title,metadata")
      .depth(1)
    },
    extractFirstObject(objects) {
      if(objects.objects == null)
        return void 0;
      else
        return objects.objects[0];
    }
  },
  created() {
    document.body.classList.add("loading");
    // Promise.all([
    //   // this.fetchObject('user-data'),
    //   // this.fetchObject('description'),
    //   // this.fetchObject('links'),
    //   // this.fetchObject('experiences'),
    //   // this.fetchObject('skills'),
    //   // this.fetchObject('projects')
    // ]).then(([
    //   // user_data
    //   // description,
    //   // links,
    //   // experiences,
    //   // skills,
    //   // projects
    // ]) => {
      this.user = {
        name: "Sujip Maharjan",
        status: ["Backend Engineer","Network Technician"],
        email: "elitexp2008@gmail.com",
        phone: "",
        city: "Lalitpur, Nepal",
        lang: "English, Nepali, Hindi",
        photo: require('@/assets/img/photo.jpg'),
      }
      this.description = {
          object:{
            metadata:{
              pres_first:"I'm a Backend Engineer currently serving as a Senior Technician at Nepal Telecom. I'm pursuing a Master's in Data Science & Computational Intelligence—a journey that blends my long-standing passion for technology with academic rigor. IT isn’t just my career; it's a lifelong passion that ignited when I first began tinkering with code over a decade ago.",
              pres_title:'Who am I?',
              pres_second:"My extensive experience in programming, along with my enthusiasm for networking and automation tools, has driven me to constantly challenge myself. I love diving into projects that push the boundaries of my current skills—whether that's exploring new programming paradigms or integrating advanced data structures to solve complex logical problems. This drive for innovation has not only honed my technical expertise but also taught me to be self-reliant and resilient in the face of challenging obstacles.I'm now eager to embrace new challenges and opportunities that allow me to further leverage my diverse skill set and deep enthusiasm for technology.",
              description:"Hope to Know you after"
            }
          }
        
      }
      this.links = {
        object: {
          metadata:{
            facebook: "https://facebook.com/moodysujip",
            instagram: "https://instagram.com/moodysujip",
            linkedin:"https://linkedin.com/in/mesujip",
            github: "https://github.com/elitexp"
          }
        }
      }
      this.experiences = {
        object:{
          metadata: {
            title:"Experience",
            description:"Professinal and academic",
            academic: [
              {
                content:'Masters in machine learning and  artificial intelligence.',
                title:'M.Sc. Data Science & Computational Intelligence',
                year:'From 09.2023'
              },
              {
                content:'Solid groundwork for my career in technology with distinction',
                title:'B.Sc. Computer Science & Information Technology',
                year:'2009-2013'
              },
              {
                content:'PTI College - Lalitpur, Nepal',
                title:'Higher Education in Science',
                year:'2007'
              },
                {
                content:'',
                title:'School Leaving Certificate',
                year:'2005'
              }
            ],
            professional:[
              {
                content:"<a href='https://datablockai.com' target='_blank'>Datablock AI</a>'s development and maintenance<ul><li style='margin: 0'>Team Lead</li><li style='margin: 0'>Backend development with Python + DJango</li><li style='margin: 0'>Graph Database (Neo4J) for Execution Flow</li><li style='margin: 0'>OpenAI Orchestration similar to Langflow</li></ul>",
                title:'Datablock AI - Lead System Architect',
                year:'From June 2024'
              },
              {
                content:"<a href='https://workzone1.com' target='_blank'>Workzone1</a>'s development and maintenance<ul><li style='margin: 0'>Team Lead</li><li style='margin: 0'>Backend development with Php/Laravel</li><li style='margin: 0'>Development of Time Tracking + Project Management tool</li><li style='margin: 0'>Payment Gateways Integration</li></ul>",
                title:'Workzone1 - Lead System Architect / Backend Engineer',
                year:'From  02.2022'
              },
              {
                content:'Developed XAMARIN IOS Application for US-based Telco Spectrum',
                title:'Freelance IOS Application Development',
                year:'10.2021 - 03.2022'
              },
              {
                content:"<ul><li style='margin: 0'>Retail Ordering System Development</li><li style='margin: 0'>Backend development with Php/Laravel</li><li style='margin: 0'></li>Development of ROSIA, R-Map & R-Score for <a href='https://evolveasia.co/' target='_blank'>EvolveAsia</a></ul>",
                title:'Software Engineer',
                year:'07.2017 - 03.2018'
              }
            ]
          }
        }
      }
      this.skills = {
        object:{
          metadata:{
            description: "Here are my skills",
            items:[
              {
                img:'php.png',
                title:'Php'
              },
              {
                img:'laravel.png',
                title:'Laravel Framework'
              },
              {
                img:'linux.png',
                title:'Linux + Devops'
              },
              {
                img:'mysql.png',
                title: 'MySQL'
              },
              {
                img: 'Csharp.png',
                title:'C# + Visual Studio'
              },
              {
                img:'html.png',
                title:'Web Development'
              },
              {
                img:'vuejs.png',
                title:'Vue JS'
              },
              {
                img:'python.png',
                title: 'Python + Django + Flask'
              },
              {
                img:'psql.png',
                title:'TimeScale + GIS'
              },
              {
                img:'neo4j.png',
                title:'GraphDB for Datablock AI'
              },
              {
                img: 'nodejs.png',
                title:'NodeJS'
              },
              {
                img:'android.png',
                title:'Android Development'
              }
            ]
          }
        }
      }
      this.projects = {
        object:{
          metadata:{
            title:"My Worked on Projects",
            description:"Showcasing my projects to you",
            items:[
              {
                color:"purple",
                content:"Datablock AI provides a drag-and-drop visual interface where users construct processing flows through connected nodes. The engine executes these flows sequentially, combining large language model operations with practical functionality to produce composite outputs. Users can visually design, modify, and monitor the execution path, with each block representing specific operations or transformations in the processing pipeline.<br/>Link : <a href='https://datablockai.com'>https://datablockai.com</a>",
                date:"2024-07-01",
                image:require('@/assets/img/projects/datablock.png'),
                link:"https://datablockai.com",
                title:"Datablock AI",
                tag:"LLM Automation"
              },
              {
                color:"blue",
                content:"NT Demands Portal provides a user-friendly web interface where customers can initiate and track FTTH connection requests from the comfort of their homes. The platform streamlines the application process through sequential forms, combining customer information collection with automated feasibility checks and documentation requirements. Users can digitally submit necessary documents, track application status in real-time, and receive automated notifications at each stage of the process. The portal eliminates the need for physical office visits by integrating digital payment options, service area verification, and interactive support features, making fiber connectivity requests accessible and transparent for all potential subscribers.",
                date:"2023-07-01",
                image:require('@/assets/img/projects/demands.png'),
                link:"https://demand.ntc.net.np",
                title:"NT Demand Portal",
                tag:"Web Application"
              },

              {
                color:"turquoise",
                content:"Workzone1 provides a comprehensive digital workspace where companies can seamlessly manage their remote workforce and project operations through an integrated dashboard interface. The platform streamlines project allocation, time tracking, and task management while combining automated payment processing with internal wallet functionality for efficient fund management. Team leaders can monitor project progress, assign tasks, track deliverables, and process payouts, while workers can access their assignments, submit work updates, and manage their earnings through their personalized wallet accounts. The platform eliminates traditional payment barriers by integrating multiple payout options, work verification systems, and transparent earning reports, making remote work management and compensation accessible and streamlined for both companies and their distributed teams.<br/>Link : <a href='https://workzone1.com'>https://workzone1.com</a>",
                date:"2022-02-01",
                image:require('@/assets/img/projects/workzone.png'),
                link:"https://workzone1.com",
                title:"Workzone1",
                tag:"Web Application"
              },
              {
                color:"orange",
                content:"The Customized Provisioning Gateway (CPG) is a network management system used by Nepal Telecom to automate and manage the provisioning of Fiber-to-the-Home (FTTH) Customer Premises Equipment (CPE). It serves as a centralized platform that handles the configuration, activation, and management of FTTH services for subscribers. The CPG interfaces with various network elements and automates the process of provisioning CPE devices, including ONTs (Optical Network Terminals), by pushing appropriate configurations and service parameters. This system helps NT streamline their FTTH service deployment and maintain quality of service for their fiber network subscribers.",
                date:"2022-02-01",
                image:require('@/assets/img/projects/cpg.png'),
                link:"https://cpg.ntc.net.np",
                title:"CPG (Customized Provisioning Gateway)",
                tag:"Softwae"
              },

            ]
          }
        }
      }
      this.isLoaded = true;
      this.$nextTick(() => document.body.classList.remove("loading"));
    // });
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

#app {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  height: 100%;
}
</style>
