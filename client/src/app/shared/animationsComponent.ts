import { trigger, transition, useAnimation, animate } from '@angular/animations';
import { bounceIn, bounceInRight, bounceInLeft, bounceInDown, zoomIn, fadeIn } from 'ng-animate';

export const ComponentAnimation = {
    bounceIn: trigger('bounceIn', [ transition('* => *', useAnimation(bounceIn)) ]),
    bounceInRight: trigger('bounceInRight', [ transition('* => *', useAnimation(bounceInRight)) ]),
    zoomIn: trigger('zoomIn', [ transition('* => *', useAnimation(zoomIn)) ]),
    bounceInLeft: trigger('bounceInLeft', [ transition('* => *', useAnimation(bounceInLeft)) ]),
    bounceInDown: trigger('bounceInDown', [ transition('* => *', useAnimation(bounceInDown)) ]),
    fadeIn: trigger('fadeIn', [ transition('* => *', useAnimation(fadeIn)) ])
};
