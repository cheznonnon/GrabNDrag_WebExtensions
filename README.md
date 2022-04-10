# GrabNDrag_WebExtensions

add-ons which are already exist are troublesome.
so I have made much more simpler version.

inertia/friction/momentum is not implemented.

[ 0.3 ]

+ [Fixed] conflict with auto-scroll in Firefox
+ [Patched] conflict when drag from anchors

[ 0.4 ]

+ [New Feature] global cursor changer available.
+ [Fixed] sites like Blogger don't work at all.
+ [Fixed] frameset-like devided-view sites work main scrollbar only.

[ 0.5 ]

+ [New Feature] smart cursor changer for anchors.
+ [Fixed] you cannot drag from anchors.

[ 0.6 ]

+ [New Feature] scrollable detection code is now simpler.
+ [Fixed] scroll will stop at nested scrollable objects.

[ 0.7 ]

+ [Fixed] regression : 0.4 global cursor changer is buggy.

[ 0.8 ]

+ [New Feature] frameset support is added.

[ current problems ]

+ special objects in some sites don't fire mousedown event.(may be unfixable)
+ this feature should be implemented as Firefox main code. it is impossible as an add-on.
