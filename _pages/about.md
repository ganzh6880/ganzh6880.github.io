---
permalink: /
title: ""
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

{% include_relative mappings.md %}

<span class='anchor' id='about-me'></span>

# 👋🏼 Hi there, I am Zhen Hao!

I am a first-year Robotics PhD student @ Robotics Department, University of Michigan, advised by [Prof. Bernadette Bucher] and part of the amazing [Mapping and Motion Lab](https://sites.google.com/umich.edu/mandmlab)! My research interests lies in **Embodied Navigation, Interactive Object Search, Physical Intelligence, Skills Acquisition and Adaptation, 3D Path and Motion Planning, Robot Learning & Foundation Models**. My PhD journey will be fully-funded through the A\*STAR National Science Scholarship PhD!

Previously, I am a Robotics Research Engineer @ Institute for Infocomm Research (I2R) and a member of Embodied Intelligence Task Force in A\*STAR. I have spent great time working with [Dr. Michael Chuah] on advancing legged robot capabilities and pushing boundaries in Physical Intelligence. I have earned a B.Eng in Electrical and Electronic Engineering with honors (Highest Distinction) from Nanyang Technological University (NTU), Singapore. My final year thesis has been supervised by [Prof. Xie Lihua] on Vision-based Robot Navigation via DRL.

I envision mobile robots go anywhere anytime autonomously and intelligently with understanding of self and environment, leveraging the power of machine learning to enhance embodied skills acquisition and adaptation.

Feel free to reach out via email if you would like to connect/collaboration/discuss!


# 🔥 News
- ***2026.09:*** Released [PhyGS](https://m-and-m-lab.github.io/PhyGS/), a physically grounded scene-generation framework, and [ForageBench](https://m-and-m-lab.github.io/ForageBench/), a benchmark for interactive object search.
- ***2026.05:*** Excited to join [NASA Jet Propulsion Laboratory](https://www.jpl.nasa.gov) as a Summer Robotics Intern 2026, working on problems related to embodied AI, robot task learning, and autonomy 🚀
- ***2025.09:*** Featured in [A\*STAR Graduate Academy’s new series](https://www.linkedin.com/posts/agasingapore_astarforsg-futurescientists-stemcareers-ugcPost-7366723554660319232-oy1s/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJ36w8B9DRkAIYDopFg8YmJ_MHyHbXk_Gg), reflecting on my research path and experience as part of the A*STAR family. Hopefully it bring inspiration the next-generation roboticsts! Big shout out to my mentor, Michael!
- ***2025.07:*** Proud to share the team has been selected for [**NVIDIA Academic Grant Program**](https://www.linkedin.com/posts/fanshi-robot_we-are-honored-to-receive-the-%F0%9D%90%8D%F0%9D%90%95%F0%9D%90%88%F0%9D%90%83-activity-7355431811486732288-VQ3f?utm_source=share&utm_medium=member_desktop&rcm=ACoAACJ36w8B9DRkAIYDopFg8YmJ_MHyHbXk_Gg) on "Adaptive Fault-Tolerant Safe Locomotion with Differentiable Simulation", lead by [Prof. Shi Fan](https://fanshi14.github.io/me/) (NUS), [Dr. Michael Chuah] (A*STAR)
- ***2025.04:*** Excited to share that I will be starting my PhD journey this fall at the Robotics Department, UofM under Prof. Bernadette Bucher!
- ***2025.03:*** Proud to announce the team has been awarded the **2024 A\*STAR Career Development Fund (CDF)** on ”Towards Physical Intelligence: Embodiment-Aware Transformer Model for Legged Robots”
- ***2024.06:*** Extremely honoured to be awarded the **A\*STAR National Science Scholarship PhD!**

# 📝 Publications 

<div class='paper-box publication-entry'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">CVPR 2026 Workshop</div>
      <img src='images/phygs-teaser.jpg' alt="PhyGS generated scenes and Spot robot simulation-to-real deployment" width="1200" height="417" loading="lazy">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

### [PhyGS: Physically-Grounded Controllable Scene Generation](https://m-and-m-lab.github.io/PhyGS/)

Aparajito Saha, <strong class="author-self">Zhen Hao Gan</strong>, Jinjia Guo, Jacob Skwirsk, Jeremy Acheampong, Anton Arapin, Chahyon Ku, Yue Hu, Nima Fazeli, Bernadette Bucher

*CVPR Workshop on Multi-Agent Embodied Intelligent Systems, 2026*

[Project](https://m-and-m-lab.github.io/PhyGS/) · [Paper](https://m-and-m-lab.github.io/PhyGS/assets/papers/phygs.pdf) · [Code](https://github.com/m-and-m-lab/PhyGS)

PhyGS generates controllable, photorealistic, and physically interactive building-scale scenes in IsaacSim, with a hardware abstraction for sim-to-real deployment on Boston Dynamics Spot.
  </div>
</div>

<div class='paper-box publication-entry'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">2026</div>
      <img src='images/foragebench-teaser.jpg' alt="ForageBench interactive object search task with navigation and manipulation" width="1200" height="782" loading="lazy">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">

### [ForageBench: A Photorealistic, Physically Grounded Benchmark for Interactive Object Search](https://m-and-m-lab.github.io/ForageBench/)

Aparajito Saha, <strong class="author-self">Zhen Hao Gan</strong>, Jinjia Guo, Jacob Skwirsk, Jeremy Acheampong, Anton Arapin, Chahyon Ku, Yue Hu, Nima Fazeli, Bernadette Bucher

*2026*

[Project](https://m-and-m-lab.github.io/ForageBench/) · [Paper](https://m-and-m-lab.github.io/ForageBench/assets/papers/foragebench.pdf) · [Code](https://github.com/m-and-m-lab/ForageBench)

ForageBench evaluates interactive object search across 25 house-scale scenes and 100 episodes, combining long-horizon navigation with fine-grained physical interaction.
  </div>
</div>

# 🎖 Honors and Awards
- ***2025.07:*** ”Adaptive Fault-Tolerant Safe Locomotion with Differentiable Simulation”, NVIDIA Academic Grant Program
- ***2025.03:*** ”Towards Physical Intelligence: Embodiment-Aware Transformer Model for Legged Robots”, 2024 A*STAR Career
Development Fund (CDF)
- ***2024.06:*** A*STAR National Science Scholarship **(NSS-PhD, 5-yr funding for Ph.D. study)**, Singapore
- ***2019.08:*** Dean List’s Academic Year 2018/2019 (Top 5% of the Cohort)
- ***2019.06:*** NTU EEE Partial Financial Award for GEM Explorer
- ***2018.08:*** Dean List’s Academic Year 2017/2018 (Top 5% of the Cohort)
- ***2017.07:*** GCE A-Level High Achiever Award (4A*)

# 📖 Educations
<div class='paper-box-right'>
  <div class='paper-box-text' markdown="1">
  **University of Michigan**, *Ann Arbor, Michigan, USA*

  PhD Student, Michigan Robotics Department

  *Aug 2025 – Present*

  Advisor: [Prof. Bernadette Bucher]
  </div>
  <div class='paper-box-image'>
    <div>
      <img src='images/umich.png' alt="sym" width="250" style="padding: 10px">
    </div>
  </div>
</div>

<div class='paper-box-right'>
  <div class='paper-box-text' markdown="1">
  **Nanyang Technological University (NTU)**, *Singapore*

  B.Eng (Electrical and Electronic Engineering), Honours (Highest Distinction)

  *Aug 2017 – Jun 2021*

  Advisor: [Prof. Xie Lihua]
  </div>
  <div class='paper-box-image'>
    <div>
      <img src='images/ntu.png' alt="sym" width="250" style="padding: 10px">
    </div>
  </div>
</div>

<div class='paper-box-right'>
  <div class='paper-box-text' markdown="1">
  **Technical University of Munich (TUM)**, *Munich, Germany*

  Student Leader, Winter Semester Exchange (Fakultat fur Elektrotechnik und Informationstechnik)

  *Oct 2019 – Mar 2020*
  </div>
  <div class='paper-box-image'>
    <div>
      <img src='images/tum.png' alt="sym" width="250" style="padding: 10px">
    </div>
  </div>
</div>

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->
