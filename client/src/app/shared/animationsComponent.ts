import { trigger, state, style, transition, animate, useAnimation } from '@angular/animations';
import { bounceIn, bounceInRight, bounceInLeft, bounceInDown, zoomIn, fadeIn, bounceInX, bounce } from 'ng-animate';


export const AnimationComponent:any = [];

// bounceIn: trigger('bounceIn', [transition('* => *', useAnimation(bounceIn))]),
// bounceInRight:trigger('bounceInRight', [transition('* => *', useAnimation(bounceInRight))]),
// zoomIn:trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))]),
// bounceInLeft:trigger('bounceInLeft', [transition('* => *', useAnimation(bounceInLeft))]),
// bounceInDown:trigger('bounceInDown', [transition('* => *', useAnimation(bounceInDown))]),
// fadeIn:trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),