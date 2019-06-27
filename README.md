# ZooTClient3D ![npm (scoped)](https://img.shields.io/npm/v/zoot/client-3d.svg)
A set of HTML5/CSS3 3D components for WEB and Mobile development.

##Getting started

Download and install into your project using NPM:

´´´bash
npm install '@zoot/client-3d'
´´´

Add the CSS to your HTML page's ´´´<head>´´´:

´´´html
<head>
  <link rel="stylesheet" type="text/css" href="npm/@zoot/client-3d/css/zoot_client_3d.css">
</head>
´´´

Add 3D components to the document's ´´´<body>´´´:

´´´html
<body>
  <div class="zoot-c3d-container zoot-c3d-anim-spin" style="font-size: 180px">
    <div class="zoot-c3d-cube">
      <div class="zoot-c3d-face">
        <h1>FRONT</h1>
      </div>
      <div class="zoot-c3d-face">
        <h1>RIGHT</h1>
      </div>
      <div class="zoot-c3d-face">
        <h1>BACK</h1>
      </div>
      <div class="zoot-c3d-face">
        <h1>LEFT</h1>
      </div>
      <div class="zoot-c3d-face">
        <h1>TOP</h1>
      </div>
      <div class="zoot-c3d-face">
        <h1>BOTTOM</h1>
      </div>
    </div>
  </div>
</body>
´´´

##Components
- [Container](#Container)
- [Cube](#Cube)
- [Face](#Face)

### Container
Any 3D component should be placed within a Container.
´´´html
<div class="zoot-c3d-container" style="font-size: 180px">
   <!-- Place your 3D components here -->
</div>
´´´
#### Size of the 3D component
The size of the components are internally defined in ´´´em´´´, the overall size of the object can be set by defining the font-size of the container (i.e.: ´´´style="font-size: 180px"´´´).

## Cube
Renders a 6 [Faces](#Face) cube within a [Container](#Container). The [Cube](#Cube)'s [Faces](#Face) are assigned in the order they are declared:
1. FRONT
2. RIGHT
3. BACK
4. LEFT
5. TOP
6. BOTTOM

´´´html
  <div class="zoot-c3d-container" style="font-size: 180px">
    <div class="zoot-c3d-cube">
      <div class="zoot-c3d-face">
        <h1>FRONT</h1>
        <p>Put anything here...</p>
      </div>
      <div class="zoot-c3d-face">
        <h1>RIGHT</h1>
        <p>Put anything here...</p>
      </div>
      <div class="zoot-c3d-face">
        <h1>BACK</h1>
        <p>Put anything here...</p>
      </div>
      <div class="zoot-c3d-face">
        <h1>LEFT</h1>
        <p>Put anything here...</p>
      </div>
      <div class="zoot-c3d-face">
        <h1>TOP</h1>
        <p>Put anything here...</p>
      </div>
      <div class="zoot-c3d-face">
        <h1>BOTTOM</h1>
        <p>Put anything here...</p>
      </div>
    </div>
  </div>
´´´

##Face
This component is used to define the 3D components' faces.

´´´html
      <div class="zoot-c3d-face">
        <!-- Put anything here... -->
      </div>
´´´

##Animations


##Authors
- Hernan Perrone - [@hperrone](@hperrone)
See also the list of [contributors](graphs/contributors) who participated in this project.
  
##License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
