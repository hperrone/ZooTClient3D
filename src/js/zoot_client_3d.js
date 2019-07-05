'use strict'

var __zoot_c3d__g_root_containers = [];

/**
 * Used internally for intializing a DOM Elelemt. Sets the element's attribute is not set, it sets to the defaultValue. 
 * 
 * @param {any} element DOM Element
 * @param {any} attrName name of the element's attribute
 * @param {any} defaultValue value to set the element's attribute when it is not defined
 */
function __zoot_c3d__attribute_setIfNotSet(element, attrName, defaultValue) {
    let attrCurrValue = element.getAttribute(attrName);

    if (attrCurrValue === null || attrCurrValue === "" || attrCurrValue === undefined) {
        element.setAttribute(attrName, defaultValue);
    }
}

/**
 * Used internally for retrieving DOM Elelemt's attribute in a normalized way.
 * 
 * @param {any} element DOM Element
 * @param {any} attrName name of the element's attribute
 * @param {any} defaultValue value to set the element's attribute when it is not defined
 * 
 * @returns {any} Attribute value or undefined when attribute is not present
 */
function __zoot_c3d__attribute_get(element, attrName, defaultValue) {
    let ret = element.getAttribute(attrName);
    if (ret === null || ret === "") {
        ret = undefined;
    }
    if (ret === undefined && defaultValue) {
        ret = defaultValue;
    }

    return ret;
}

/**
 * Intializes properties, attributes and functions common to any ZooTC3DComponent 
 * 
 * TAG: -
 * ATTR:
 *   zoot-c3d-model-size: escalar number defining a size factor for all the Container
 * 
 *   zoot-c3d-x: x coordinate of the component, proportional to parent's width. Default 0
 *   zoot-c3d-y: y coordinate of the component, proportional to parent's height. Default 0
 *   zoot-c3d-z: z coordinate of the component, proportional to parent's depth. Default 0
 *   zoot-c3d-w: width scale of the component, proportional to parent's width. Default 1.0
 *   zoot-c3d-h: height scale of the component, proportional to parent's height. Default 1.0
 *   zoot-c3d-d: depth scale of the component, proportional to parent's depth. Default 1.0
 *   zoot-c3d-rotx: rotation angle of the component over X axis. Default 0
 *   zoot-c3d-roty: rotation angle of the component over Y axis. Default 0
 *   zoot-c3d-rotz: rotation angle of the component over Z axis. Default 0
 *   zoot-c3d-pivx: pivot of the component over X axis. Default 0.5
 *   zoot-c3d-pivy: pivot angle of the component over Y axis. Default 0.5
 *   zoot-c3d-pivz: pivot angle of the component over Z axis. Default 0
 *   
 *   zoot-c3d-transition-duration: equivalent to CSS transition-duration. Default 0.5
 *   zoot-c3d-transition-delay: equivalent to CSS transition-delay. Default 0
 *   zoot-c3d-transition-timing-function: equivalent to CSS transition-timing-function. Default 'ease'
 *   
 *   zoot-c3d-wire-width: Wireframe line width in px
 *   zoot-c3d-wire-style: Wireframe line style (same as CSS border-style)
 *   zoot-c3d-wire-color: Wireframe line color (same as CSS border-color)
 *   
 *   zoot-c3d-background: Background definition for the component (same as CSS background)
 *   
 * FUNCTIONS:
 *    zoot_c3d_getBackground() Returns component's calculated background definition. (from zoot-c3d-background)
 *    zoot_c3d_getComponentSizeFactor() Returns the component's size factor. (from zoot-c3d-model-size)
 *    zoot_c3d_getParent() Returns component's Container DOM Element
 *    zoot_c3d_getPosition(absolute) Returns component's dimension. Format {x: <length>, y: <length>, z: <length>, w: <length>, h: <length>, d: <length>, rotx: <angle>, roty: <angle>, rotz: <angle>, pivx: <length>, pivy: <length>, pivz: <length> }
 *    zoot_c3d_setPosition(pos, force) Set component's position. Format {x: <length>, y: <length>, z: <length>, w: <length>, h: <length>, d: <length>, rotx: <angle>, roty: <angle>, rotz: <angle>, pivx: <length>, pivy: <length>, pivz: <length> }
 *    zoot_c3d_getTransition() Returns the component's transition. Format {duration: <float>, delay: <float>, timing_function: <CSS transition-timing-function> }
 *    zoot_c3d_getWireframe() Returns component's calculated wireframe definition. (from zoot-c3d-wire-width, zoot-c3d-wire-style and zoot-c3d-wire-color). Format {width: <length>, style: <CSS Border's style>, color: <CSS Color>}
 *    zoot_c3d_sync() Synchronizes attributes zoot-c3d-* to DOM Element styles
 *    zoot_c3d_syncPosition() Synchronizes positional attributes 'zoot-c3d-*' to DOM Element styles. Called by zoot_c3d_sync(), can be overriden for specific component behaviour.
 *    
 *    Actions:
 *    zoot_c3d_rotate(degx, degy, degz) Inclrementally rotates the component
 *    zoot_c3d_move(dx, dy, dz) Inclrementally moves the component
 *    
 * @param {any} parent DOM Element that is the Container of the Component
 * @param {any} component DOM Element representing this Component
 */
function __zoot_c3d__process_Component(parent, component) {

    //DEFAULT STYLE INITIALIZATION
    component.style.display = 'block';

    if (parent) {
        //Do not change root container behavior.
        component.style.padding = 0;
        component.style.margin = 0;
        component.style.position = 'absolute';
    }
    //component.style.top = 0;
    //component.style.left = 0;
    component.style.userSelect = 'none';


    /**
     *   zoot_c3d_getParent()
     * 
     *   Returns component's Container DOM Element
     * 
     * */
    component.zoot_c3d_getParent = function () {
        return parent;
    };

    /**
     *    zoot_c3d_getTransition() 
     *    Returns the component's transition. Format {duration: <float>, delay: <float>, timing_function: <CSS transition-timing-function> }
     */
    component.zoot_c3d_getTransition = function () {
        let ret;
        if (parent) {
            ret = parent.zoot_c3d_getTransition();
        } else {
            ret = {
                duration: 0.5,
                delay: 0,
                timing_function: 'ease'
            };
        }
        ret.duration = __zoot_c3d__attribute_get(component, 'zoot-c3d-transition-duration', ret.duration);
        ret.delay = __zoot_c3d__attribute_get(component, 'zoot-c3d-transition-delay', ret.delay);
        ret.timing_function = __zoot_c3d__attribute_get(component, 'zoot-c3d-transition-timing-function', ret.timing_function);

        return ret;
    };

    /**
     *    zoot_c3d_getComponentSizeFactor() 
     *    Returns the component's size factor. (from zoot-c3d-model-size)
     */
    component.zoot_c3d_getComponentSizeFactor = function () {
        let ret = parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-model-size', 0));
        if ((ret === 0.0 || isNaN(ret)) && parent) {
            ret = parent.zoot_c3d_getComponentSizeFactor();
        }
        if (ret === 0.0 || isNaN(ret)) {
            ret = 1;
        }
        return ret;
    };


    /**
     * zoot_c3d_getPosition(absolute) 
     * 
     * Returns component's dimension. Format {x: <length>, y: <length>, z: <length>, w: <length>, h: <length>, d: <length>, rotx: <angle>, roty: <angle>, rotz: <angle>, pivx: <length>, pivy: <length>, pivz: <length> }
     * 
     * @param {any} absolute
     */
    component.zoot_c3d_getPosition = function (absolute) {
        let ret = {
            x: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-x', "0")),
            y: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-y', "0")),
            z: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-z', "0")),
            w: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-w', "1")),
            h: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-h', "1")),
            d: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-d', "1")),
            rotx: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-rotx', "0")),
            roty: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-roty', "0")),
            rotz: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-rotz', "0")),
            pivx: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-pivx', "0.5")),
            pivy: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-pivy', "0.5")),
            pivz: parseFloat(__zoot_c3d__attribute_get(component, 'zoot-c3d-pivz', "0"))
        };

        if (!parent) {
            ret.w = component.offsetWidth;
            ret.h = component.offsetHeight;
        }
        return ret;
    };

    /**
     * zoot_c3d_setPosition(pos, force) 
     * 
     * Sets the component's position. 
     * 
     * @param {any} pos Format {x: <length>, y: <length>, z: <length>, w: <length>, h: <length>, d: <length>, rotx: <angle>, roty: <angle>, rotz: <angle>, pivx: <length>, pivy: <length>, pivz: <length> }
     * @param {any} force Force setting all the passed position params
     */
    component.zoot_c3d_setPosition = function (pos, force) {
        if (pos.hasOwnProperty('x')) {
            component.setAttribute('zoot-c3d-x', pos.x);
        }
        if (pos.hasOwnProperty('y')) {
            component.setAttribute('zoot-c3d-y', pos.y);
        }
        if (pos.hasOwnProperty('z')) {
            component.setAttribute('zoot-c3d-z', pos.z);
        }
        if (pos.hasOwnProperty('w')) {
            component.setAttribute('zoot-c3d-w', pos.w);
        }
        if (pos.hasOwnProperty('h')) {
            component.setAttribute('zoot-c3d-h', pos.h);
        }
        if (pos.hasOwnProperty('d')) {
            component.setAttribute('zoot-c3d-d', pos.d);
        }
        if (pos.hasOwnProperty('rotx')) {
            component.setAttribute('zoot-c3d-rotx', pos.rotx);
        }
        if (pos.hasOwnProperty('roty')) {
            component.setAttribute('zoot-c3d-roty', pos.roty);
        }
        if (pos.hasOwnProperty('rotz')) {
            component.setAttribute('zoot-c3d-rotz', pos.rotz);
        }
        if (pos.hasOwnProperty('pivx')) {
            component.setAttribute('zoot-c3d-pivx', pos.pivx);
        }
        if (pos.hasOwnProperty('pivy')) {
            component.setAttribute('zoot-c3d-pivy', pos.pivy);
        }
        if (pos.hasOwnProperty('pivz')) {
            component.setAttribute('zoot-c3d-pivz', pos.pivz);
        }
    };


    /**
     * zoot_c3d_getBackground() 
     * Returns component's calculated background definition. (from zoot-c3d-background)
     * 
     */
    component.zoot_c3d_getBackground = function () {
        let bkg;
        if (parent) {
            bkg = parent.zoot_c3d_getBackground();
        } else {
            bkg = 'rgba(0,0,0,0.7)';
        }
        bkg = __zoot_c3d__attribute_get(component, 'zoot-c3d-background', bkg);
        return bkg;
    };


    /**
     *    zoot_c3d_getWireframe() 
     *    Returns component's calculated wireframe definition. (from zoot-c3d-wire-width, zoot-c3d-wire-style and zoot-c3d-wire-color). 
     *    
     *    @return {width: <length>, style: <CSS Border's style>, color: <CSS Color>}
     * 
     */
    component.zoot_c3d_getWireframe = function () {
        let wire;
        if (parent) {
            wire = parent.zoot_c3d_getWireframe();
        } else {
            wire = {
                width: 0,
                style: 'solid',
                color: 'rgba(0,0,0,1)'
            };
        }

        wire.width = __zoot_c3d__attribute_get(component, 'zoot-c3d-wire-width', wire.width);
        wire.style = __zoot_c3d__attribute_get(component, 'zoot-c3d-wire-style', wire.style);
        wire.color = __zoot_c3d__attribute_get(component, 'zoot-c3d-wire-color', wire.color);

        return wire;
    };

    /**
     *  zoot_c3d_syncPosition() 
     *  Synchronizes positional attributes 'zoot-c3d-*' to DOM Element styles. Called by zoot_c3d_sync(), can be overriden for specific component behaviour.
     */
    component.zoot_c3d_syncPosition = function () {
        let pos = component.zoot_c3d_getPosition();
        let sf = component.zoot_c3d_getComponentSizeFactor();

        if (parent) {
            component.style.transformOrigin = "" + (pos.pivx * pos.w) * sf + "px " + (pos.pivy * pos.h) * sf + "px " + (pos.pivz * pos.d) * sf + "px";
            let transform =
                "rotateX(" + pos.rotx + "deg) "
                + "rotateY(" + pos.roty + "deg) "
                + "rotateZ(" + pos.rotz + "deg) "
                + "translate3d(" + (pos.x * sf) + "px, " + (pos.y * sf) + "px, " + (pos.z * sf) + "px) "
                /*+ "scale3d(" + pos.w + ", " + pos.h + ", " + pos.d + ") "*/;
            component.style.transform = transform;
            component.style.width = "" + (pos.w * sf) + "px";
            component.style.height = "" + (pos.h * sf) + "px";
        } 

    };

    /**
     *  zoot_c3d_sync() 
     *  Synchronizes attributes 'zoot-c3d-*' to DOM Element styles
     */ 
    component.zoot_c3d_sync = function () {
        let transition = component.zoot_c3d_getTransition();
        let pos = component.zoot_c3d_getPosition();
        let sf = component.zoot_c3d_getComponentSizeFactor();
        component.style.transitionProperty = "transform, transform-origin, background, opacity";
        component.style.transitionTimingFunction = transition.timing_function;
        component.style.transitionDuration = "" + transition.duration + "s";
        component.style.transitionDelay = "" + transition.delay + "s";
        component.style.transformStyle = 'preserve-3d';

        component.zoot_c3d_syncPosition();
    };

    /**
     * zoot_c3d_move()
     * Incremental movement of the component
     * 
     * @param {any} dx delta x
     * @param {any} dy delta y
     * @param {any} dz delta z
     */
    component.zoot_c3d_move = function (dx, dy, dz) {
        let mov = {};
        let currPos = component.zoot_c3d_getPosition();
        if (dx) {
            mov.x = currPos.x + dx;
        }
        if (dy) {
            mov.y = currPos.y + dy;
        }
        if (dz) {
            mov.z = currPos.z + dz;
        }
        component.zoot_c3d_setPosition(mov);
    };

    /**
     * zoot_c3d_rotate()
     * 
     * Incremental rotation of the component
     * 
     * @param {any} degx angle to rotate along X axis
     * @param {any} degy angle to rotate along Y axis
     * @param {any} degz angle to rotate along Z axis
     */
    component.zoot_c3d_rotate = function (degx, degy, degz) {
        let rot = {};
        let currPos = component.zoot_c3d_getPosition();
        if (degx) {
            rot.rotx = currPos.rotx + degx;
        }
        if (degy) {
            rot.roty = currPos.roty + degy;
        }
        if (degz) {
            rot.rotz = currPos.rotz + degz;
        }
        component.zoot_c3d_setPosition(rot);
    };




    switch (component.tagName.toLowerCase()) {
        case 'zoot-c3d-root-container':
        case 'zoot-c3d-container':
            __zoot_c3d__process_Container(parent, component);
            break;
        case 'zoot-c3d-prism':
            __zoot_c3d__process_Prism(parent, component);
            break;
        case 'zoot-c3d-cube':
            __zoot_c3d__process_Cube(parent, component);
            break;
        case 'zoot-c3d-face':
        case 'zoot-c3d-face-front':
        case 'zoot-c3d-face-left':
        case 'zoot-c3d-face-right':
        case 'zoot-c3d-face-back':
        case 'zoot-c3d-face-top':
        case 'zoot-c3d-face-bottom':
            __zoot_c3d__process_Face(parent, component);
            break;
    }

    component.zoot_c3d_sync();
}


/**
 * <zoot-c3d-container [zoot-c3d-width="1.0"] [zoot-c3d-height="1.0"] [zoot-c3d-depth="1.0"]>
 *   Possible child types:
 *     <zoot-c3d-container>*
 *     <zoot-c3d-cube>*
 *     <zoot-c3d-prism>*
 *     <zoot-c3d-tile>*
 *     
 *   Functions:
 *     zoot_c3d_getParent(): Returns Parent Container
 *     zoot_c3d_getDimension(): Returns Component Dimension { w: <number>, h: <number>, d: <number> }
 * </zoot-c3d-container>
 * @param {any} container
 */


/**
 * Intializes properties, attributes and functions common to any ZooTC3DContainer
 *
 * TAG: <zoot-c3d-root-container> or <zoot-c3d-container>
 * ATTR:
 * FUNCTIONS:
 * 
 * @param {any} container container DOM Element
 */
function __zoot_c3d__process_Container(parent, container) {
    //SET SPECIFIC STYLES FOR CONTAINERS
    container.style.overflow = 'hidden';

    //LET INITIALIZE ALL THE CHILDREN ELEMENTS
    for (let i = 0; i < container.children.length; i++) {
        if (container.children[i].tagName.toLowerCase().indexOf('zoot-c3d-') === 0) {
            __zoot_c3d__process_Component(container, container.children[i]);
        }
    }

    //OVERRIDE zoot_c3d_sync()
    let super_sync = container.zoot_c3d_sync;
    container.zoot_c3d_sync = function () {
        //Just invoke zoot_c3d_sync() on all children
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].tagName.toLowerCase().indexOf('zoot-c3d-') === 0) {
                if (container.children[i].zoot_c3d_sync) {
                    container.children[i].zoot_c3d_sync();
                }
            }
        }
        //Then invoke the default zoot_c3d_sync() defined in Component
        if (super_sync) {
            super_sync();
        }
    };
}



function __zoot_c3d__createWrapper(component, elements) {
    //Lets create an special container <zoot-c3d-priv-wrapper> and move the elements to it
    //Instantiate the new element and set the proper styling
    let wrapper = document.createElement('zoot-c3d-priv-wrapper');
    wrapper.style.transformStyle = "preserve-3d";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.margin = "0px";
    wrapper.style.padding = "0px";
    wrapper.style.top = "0px";
    wrapper.style.left = "0px";
    wrapper.style.position = "absolute";

    for (let i = 0; i < elements.length; i++) {
        //remove the elements from the Component Element and add it to the wrapper
        component.removeChild(elements[i]);
        wrapper.appendChild(elements[i]);
    }
    //Finally lets append the new Wrapper to the Component Element
    component.appendChild(wrapper);

    return wrapper;
}

/**
 * Intializes properties, attributes and functions common to any ZooTC3DFace
 *
 * TAG: <zoot-c3d-face>, <zoot-c3d-face-front>, <zoot-c3d-face-left>, <zoot-c3d-face-right>, <zoot-c3d-face-back>, <zoot-c3d-face-top>, <zoot-c3d-face-bottom>
 * ATTR:
 * FUNCTIONS:
 * 
 * @param {any} parent The parent DOM Element of this component
 * @param {any} face The DOM Element representing this face
 */
function __zoot_c3d__process_Face(parent, face) {
    //SET SPECIFIC STYLES FOR STANDALONE FACES 
    if (parent.tagName.toLowerCase() === 'zoot-c3d-container' || parent.tagName.toLowerCase() === 'zoot-c3d-root-container') {

        face.__zoot_c3d__face_wrapper = __zoot_c3d__createWrapper(face, face.childNodes);


        //OVERRIDE zoot_c3d_syncPosition()
        face.zoot_c3d_syncPosition = function () {
            let pos = face.zoot_c3d_getPosition();
            let sf = face.zoot_c3d_getComponentSizeFactor();

            face.__zoot_c3d__face_wrapper.style.transformOrigin = "" + pos.pivx * pos.w * sf + "px " + pos.pivy * pos.h * sf + "px " + pos.pivz * pos.d * sf + "px ";
            face.__zoot_c3d__face_wrapper.style.transform =
                "rotateX(" + pos.rotx + "deg) "
                + "rotateY(" + pos.roty + "deg) "
                + "rotateZ(" + pos.rotz + "deg) ";
            face.__zoot_c3d__face_wrapper.style.width = "" + (pos.w * sf) + "px";
            face.__zoot_c3d__face_wrapper.style.height = "" + (pos.h * sf) + "px";

            face.style.transformOrigin = "0px 0px 0px";
            face.style.transform = "translate3d(" + (pos.x * sf) + "px, " + (pos.y * sf) + "px, " + (pos.z * sf) + "px) ";
            face.style.width = "" + (pos.w * sf) + "px";
            face.style.height = "" + (pos.h * sf) + "px";
        };
    } else {
        //SET SPECIFIC STYLES FOR FACES AS SUBCOMPONENTS
        face.style.overflow = 'hidden';

        //OVERRIDE zoot_c3d_setPostion()
        let super_setPosition = face.zoot_c3d_setPosition;
        face.zoot_c3d_setPosition = function (pos, force) {
            //Only allow changing postion if force is set when Face is a subcomponent of another Component such as Cube or Prism
            if (force) {
                super_setPosition(pos, force);
            }
        };

    }


    //OVERRIDE zoot_c3d_sync()
    let super_sync = face.zoot_c3d_sync;
    face.zoot_c3d_sync = function () {
        //Call Component's zoot_c3d_sync()
        if (super_sync) {
            super_sync();
        }

        //If the face is standalone, the actual face is wrapped
        let applyStyle = face;
        if (face.__zoot_c3d__face_wrapper) {
            applyStyle = face.__zoot_c3d__face_wrapper;
        }

        //Apply any background style defined
        let bkg = face.zoot_c3d_getBackground();
        if (bkg) {
            applyStyle.style.background = bkg;
        }

        //Apply any wire style defined
        let wire = face.zoot_c3d_getWireframe();
        if (wire) {
            applyStyle.style.borderWidth = "" + wire.width + "px";
            applyStyle.style.borderStyle = wire.style;
            applyStyle.style.borderColor = wire.color;
        }
    };
}


/**
 * Intializes properties, attributes and functions common to any ZooTC3DPrism
 *
 * TAG: <zoot-c3d-prism>
 * ATTR:
 *   zoot-c3d-autoface: Boolean enabling/disabling automatically creating faces not defined. Default: true
 * FUNCTIONS:
 * 
 * @param {any} parent The parent DOM Element of this Component
 * @param {any} prism The DOM Element representing this Prism
 */
function __zoot_c3d__process_Prism(parent, prism) {
    let components = prism.children;
    let faces = [];

    // Lets identify the Faces defined within this component
    for (let i = 0; i < components.length; i++) {
        if (components[i].tagName.toLowerCase().indexOf('zoot-c3d-face') === 0) {
            __zoot_c3d__process_Component(prism, components[i]);
            switch (components[i].tagName.toLowerCase()) {
                case 'zoot-c3d-face-front':
                    prism.__zoot_c3d__face_front = components[i];
                    break;
                case 'zoot-c3d-face-back':
                    prism.__zoot_c3d__face_back = components[i];
                    break;
                case 'zoot-c3d-face-left':
                    prism.__zoot_c3d__face_left = components[i];
                    break;
                case 'zoot-c3d-face-right':
                    prism.__zoot_c3d__face_right = components[i];
                    break;
                case 'zoot-c3d-face-top':
                    prism.__zoot_c3d__face_top = components[i];
                    break;
                case 'zoot-c3d-face-bottom':
                    prism.__zoot_c3d__face_bottom = components[i];
                    break;
            }
            faces.push(components[i]);
        }
    }

    //Lets create an special container <zoot-c3d-priv-wrapper> and move the faces to it (all done by the function below)
    let facesContainer = __zoot_c3d__createWrapper(prism, faces);

    //Add missing faces if autoface is enabled
    let autoface = __zoot_c3d__attribute_get(prism, 'zoot-c3d-autoface', 'true') === 'true';
    if (autoface) {
        if (!prism.__zoot_c3d__face_front) {
            prism.__zoot_c3d__face_front = document.createElement('zoot-c3d-face-front');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_front);
            faces.push(prism.__zoot_c3d__face_front);
            facesContainer.appendChild(prism.__zoot_c3d__face_front);
        }

        if (!prism.__zoot_c3d__face_back) {
            prism.__zoot_c3d__face_back = document.createElement('zoot-c3d-face-back');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_back);
            faces.push(prism.__zoot_c3d__face_back);
            facesContainer.appendChild(prism.__zoot_c3d__face_back);
        }

        if (!prism.__zoot_c3d__face_left) {
            prism.__zoot_c3d__face_left = document.createElement('zoot-c3d-face-left');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_left);
            faces.push(prism.__zoot_c3d__face_left);
            facesContainer.appendChild(prism.__zoot_c3d__face_left);
        }

        if (!prism.__zoot_c3d__face_right) {
            prism.__zoot_c3d__face_right = document.createElement('zoot-c3d-face-right');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_right);
            faces.push(prism.__zoot_c3d__face_right);
            facesContainer.appendChild(prism.__zoot_c3d__face_right);
        }

        if (!prism.__zoot_c3d__face_top) {
            prism.__zoot_c3d__face_top = document.createElement('zoot-c3d-face-top');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_top);
            faces.push(prism.__zoot_c3d__face_top);
            facesContainer.appendChild(prism.__zoot_c3d__face_top);
        }

        if (!prism.__zoot_c3d__face_bottom) {
            prism.__zoot_c3d__face_bottom = document.createElement('zoot-c3d-face-bottom');
            __zoot_c3d__process_Component(prism, prism.__zoot_c3d__face_bottom);
            faces.push(prism.__zoot_c3d__face_bottom);
            facesContainer.appendChild(prism.__zoot_c3d__face_bottom);
        }

    }

    //OVERRIDE zoot_c3d_syncPosition()
    prism.zoot_c3d_syncPosition = function () {
        prism.style.position = 'absolute';
        let pos = prism.zoot_c3d_getPosition();
        let sf = prism.zoot_c3d_getComponentSizeFactor();

        facesContainer.style.transformOrigin = "" + pos.pivx * pos.w * sf + "px " + pos.pivy * pos.h * sf + "px " + pos.pivz * pos.d * sf + "px ";
        facesContainer.style.transform =
            "rotateX(" + pos.rotx + "deg) "
            + "rotateY(" + pos.roty + "deg) "
            + "rotateZ(" + pos.rotz + "deg) ";
        facesContainer.style.width = "" + (pos.w * sf) + "px";
        facesContainer.style.height = "" + (pos.h * sf) + "px";

        prism.style.transformOrigin = "0px 0px 0px";
        prism.style.transform = "translate3d(" + (pos.x * sf) + "px, " + (pos.y * sf) + "px, " + (pos.z * sf) + "px) ";
        prism.style.width = "" + (pos.w * sf) + "px";
        prism.style.height = "" + (pos.h * sf) + "px";

    };

    //OVERRIDE zoot_c3d_sync()
    let super_sync = prism.zoot_c3d_sync;
    prism.zoot_c3d_sync = function () {
        //Calculate Face positions everytime, since they can be animated as well.
        let pos = prism.zoot_c3d_getPosition();
        if (prism.__zoot_c3d__face_front) {
            prism.__zoot_c3d__face_front.zoot_c3d_setPosition({ z: pos.d / 2, w: pos.w, h: pos.h, d: 0, roty: 0, pivx: 0, pivy: 0, pivz:0 }, true);
        }
        if (prism.__zoot_c3d__face_back) {
            prism.__zoot_c3d__face_back.zoot_c3d_setPosition({ x: -pos.w, z: pos.d / 2, w: pos.w, h: pos.h, d: 0, roty: 180, pivx: 0, pivy: 0, pivz: 0 }, true);
        }
        if (prism.__zoot_c3d__face_right) {
            prism.__zoot_c3d__face_right.zoot_c3d_setPosition({ x: -pos.d / 2, z: pos.w, w: pos.d, h: pos.h, d: 0, roty: 90, pivx: 0, pivy: 0, pivz: 0 }, true);
        }
        if (prism.__zoot_c3d__face_left) {
            prism.__zoot_c3d__face_left.zoot_c3d_setPosition({ x: -pos.d / 2, w: pos.d, h: pos.h, d: 0, roty: -90, pivx: 0, pivy: 0, pivz: 0 }, true);
        }
        if (prism.__zoot_c3d__face_top) {
            prism.__zoot_c3d__face_top.zoot_c3d_setPosition({ y: -pos.d / 2, z: 0, w: pos.w, h: pos.d, d: 0, rotx: 90, pivx: 0, pivy: 0, pivz: 0 }, true);
        }
        if (prism.__zoot_c3d__face_bottom) {
            prism.__zoot_c3d__face_bottom.zoot_c3d_setPosition({ y: -pos.d / 2, z: pos.h, w: pos.w, h: pos.d, d: 0, rotx: -90, pivx: 0, pivy: 0, pivz: 0 }, true);
        }

        //Call zoot_c3d_sync() for all Prism's children except for faces
        for (let i = 0; i < prism.children.length; i++) {
            if (prism.children[i].tagName.toLowerCase().indexOf('zoot-c3d-') === 0) {
                if (prism.children[i].zoot_c3d_sync) {
                    prism.children[i].zoot_c3d_sync();
                }
            }
        }

        //Call zoot_c3d_sync() for all Prism's faces
        for (let i = 0; i < faces.length; i++) {
            faces[i].zoot_c3d_sync();
        }

        //Call default zoot_c3d_sync() itself
        if (super_sync) {
            super_sync();
        }
    };

}

/**
 * Intializes properties, attributes and functions common to any ZooTC3DCube
 *
 * A Cube is an special case of Prism, where all dimension are equal. Master dimension is zoot-c3d-w.
 * 
 * TAG: <zoot-c3d-cube>
 * ATTR:
 * FUNCTIONS:
 * 
 * @param {any} parent The parent DOM Element of this Component
 * @param {any} cube The DOM Element representing this Cube
 */
function __zoot_c3d__process_Cube(parent, cube) {
    //OVERRIDE zoot_c3d_getPosition() in order to return pos.d and pos.h equals to pos.w;
    let super_getPosition = cube.zoot_c3d_getPosition;
    cube.zoot_c3d_getPosition = function (absolute) {
        // first call the parent
        let ret = super_getPosition(absolute);
        // then force ret.h and ret.d to be equals to ret.w
        ret.h = ret.d = ret.w;

        return ret;
    };

    //Then initialize as a Prism
    __zoot_c3d__process_Prism(parent, cube);

}


/**
 *  Visits the DOM looking for <zoot-c3d-root-container> and initializes all the declared ZooT3DComponents 
 * 
 */

function __zoot_c3d__process_DOM() {
    let containers = document.body.getElementsByTagName('zoot-c3d-root-container');
    for (let i = 0; i < containers.length; i++) {
        __zoot_c3d__process_Component(undefined, containers[i]);
        __zoot_c3d__g_root_containers.push(containers[i]);
        containers[i].zoot_c3d_sync();
    }
}


/**
 * ZooT_3DInit()
 * This function must be called to initialize the ZooT_3D framework; 
 * Just call it after the document has be loaded
 */
function ZooT_3DInit() {
    __zoot_c3d__process_DOM();
}

window.addEventListener('load', ZooT_3DInit);