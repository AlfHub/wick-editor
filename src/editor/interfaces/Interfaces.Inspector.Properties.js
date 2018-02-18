InspectorInterface.getProperties = function (wickEditor, inspector) {

	var properties = [];

    selectionInfo = inspector.selectionInfo;

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/name.svg" class="inspector-icon"/>',
        tooltip: 'Name',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject'
                && !selectionInfo.object.isPath;
        },
        getValueFn: function () {
            return selectionInfo.object.name || "";
        }, 
        onChangeFn: function (val) {
            selectionInfo.object.name = val;
        }
    }));

    properties.push(new InspectorInterface.TwoStringInput({
        title: '<img src="resources/inspector-icons/position.svg" class="inspector-icon"/>',
        tooltip: 'Position (x,y)',
        otherTitle: ',',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject';
        },
        getValueFn: function () {
            return {
                left:  roundToHundredths(selectionInfo.object.x),
                right: roundToHundredths(selectionInfo.object.y)
            };
        }, 
        onChangeFn: function (vals) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    x: eval(vals.left),
                    y: eval(vals.right)
                }]
            });
        }
    }));

    properties.push(new InspectorInterface.TwoStringInput({
        title: '<img src="resources/inspector-icons/size.svg" class="inspector-icon"/>',
        tooltip: 'Width / Height',
        otherTitle: ',',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject'
                && selectionInfo.dataType !== 'text';
        },
        getValueFn: function () {
            return {
                left:  roundToHundredths(selectionInfo.object.scaleX*selectionInfo.object.width),
                right: roundToHundredths(selectionInfo.object.scaleY*selectionInfo.object.height)
            };
        }, 
        onChangeFn: function (vals) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    scaleX: eval(vals.left) /selectionInfo.object.width,
                    scaleY: eval(vals.right)/selectionInfo.object.height
                }]
            });
        }
    }));

    properties.push(new InspectorInterface.TwoStringInput({
        title: '<img src="resources/inspector-icons/scale.svg" class="inspector-icon"/>',
        tooltip: 'Scale',
        otherTitle: 'x',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject'
                && selectionInfo.dataType !== 'sound'
                && selectionInfo.dataType !== 'text';
        },
        getValueFn: function () {
            return {
                left:  roundToHundredths(selectionInfo.object.scaleX),
                right: roundToHundredths(selectionInfo.object.scaleY)
            };
        }, 
        onChangeFn: function (vals) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    scaleX: eval(vals.left),
                    scaleY: eval(vals.right)
                }]
            });
        }
    }));

    /*properties.push(new InspectorInterface.StringInput({
        title: 'Rotation',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject';
        },
        getValueFn: function () {
            return roundToHundredths(selectionInfo.object.rotation);
        }, 
        onChangeFn: function (val) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    rotation: eval(val)
                }]
            });
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: 'Opacity',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
            && selectionInfo.type == 'wickobject'
            && selectionInfo.dataType !== 'sound'
            && selectionInfo.dataType !== 'path';
        },
        getValueFn: function () {
            return roundToHundredths(selectionInfo.object.opacity);
        }, 
        onChangeFn: function (val) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    opacity: eval(val)
                }]
            });
        }
    }));*/

    properties.push(new InspectorInterface.TwoStringInput({
        title: '<img src="resources/inspector-icons/rotation.svg" class="inspector-icon"/>',
        tooltip: 'Rotation',
        otherTitle: '<img src="resources/inspector-icons/opacity.svg" class="inspector-icon"/>',
        otherTooltip: 'Opacity',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject'
                && selectionInfo.dataType !== 'sound'
                && selectionInfo.dataType !== 'text';
        },
        getValueFn: function () {
            return {
                left:  roundToHundredths(selectionInfo.object.rotation),
                right: roundToHundredths(selectionInfo.object.opacity)
            };
        }, 
        onChangeFn: function (vals) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    rotation: eval(vals.left),
                    opacity: eval(vals.right)
                }]
            });
        }
    }));

    properties.push(new InspectorInterface.SelectInput({
        title: '<img src="resources/inspector-icons/fontfamily.svg" class="inspector-icon"/>',
        tooltip: 'Font Family',
        options: getAllGoogleFonts(),
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject' 
                && selectionInfo.object.isText;
        },
        getValueFn: function () {
            return selectionInfo.object.textData.fontFamily;
        }, 
        onChangeFn: function (val) {
            loadGoogleFonts([val], function () {
                selectionInfo.object.textData.fontFamily = val;
                wickEditor.canvas.getInteractiveCanvas().needsUpdate = true;
                wickEditor.syncInterfaces();
            });
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/fontsize.svg" class="inspector-icon"/>',
        tooltip: 'Font Size',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isText;
        },
        getValueFn: function () {
            return selectionInfo.object.textData.fontSize;
        },
        onChangeFn: function (val) {
            selectionInfo.object.textData.fontSize = eval(val);
            wickEditor.canvas.getInteractiveCanvas().needsUpdate = true;
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.MultiCheckboxInput({
        title: '',
        icons: [
            'resources/align-left.svg', 
            'resources/align-center.svg',
            'resources/align-right.svg',
            'resources/text-bold.svg',
            'resources/text-italic.svg'
        ],
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isText;
        },
        getValueFn: function () {
            return [
                selectionInfo.object.textData.textAlign === 'left',
                selectionInfo.object.textData.textAlign === 'center',
                selectionInfo.object.textData.textAlign === 'right',
                selectionInfo.object.textData.fontWeight === 'bold',
                selectionInfo.object.textData.fontStyle === 'italic'
            ];
        }, 
        onChangeFn: function (vals) {
            var currentAlign = selectionInfo.object.textData.textAlign;
            if(vals[0]) {
                if(currentAlign !== 'left') selectionInfo.object.textData.textAlign = 'left';
            }
            if(vals[1]) {
                if(currentAlign !== 'center') selectionInfo.object.textData.textAlign = 'center';
            }
            if(vals[2]) {
                if(currentAlign !== 'right') selectionInfo.object.textData.textAlign = 'right';
            }
            selectionInfo.object.textData.fontWeight = vals[3] ? 'bold' : '';
            selectionInfo.object.textData.fontStyle = vals[4] ? 'italic' : '';
            wickEditor.canvas.getInteractiveCanvas().needsUpdate = true;
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.ColorPickerInput({
        title: '<img src="resources/inspector-icons/paint.svg" class="inspector-icon"/>',
        tooltip: 'Font Color',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isText;
        },
        getValueFn: function () {
            return selectionInfo.object.textData.fill;
        }, 
        onChangeFn: function (val) {
            selectionInfo.object.textData.fill = val;
            wickEditor.canvas.getInteractiveCanvas().needsUpdate = true;
            wickEditor.syncInterfaces();
        }
    }));

    /*properties.push(new InspectorInterface.ColorPickerInput({
        title: 'StrokeColor',
        previewType: 'strokeColor',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            return selectionInfo.object.paper 
                && selectionInfo.object.paper.strokeColor
                && selectionInfo.object.paper.strokeColor.toCSS();
        }, 
        onChangeFn: function (val) {
            wickEditor.guiActionHandler.doAction("changePathProperties", {
                strokeColor: val
            });
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.ColorPickerInput({
        title: 'Fill Color',
        previewType: 'fillColor',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            return selectionInfo.object.paper 
                && selectionInfo.object.paper.fillColor
                && selectionInfo.object.paper.fillColor.toCSS();
        }, 
        onChangeFn: function (val) {
            wickEditor.guiActionHandler.doAction("changePathProperties", {
                fillColor: val
            });
            wickEditor.syncInterfaces();
        }
    }));*/

    properties.push(new InspectorInterface.TwoColorPickerInput({
        previewTypeLeft: 'fillColor',
        previewTypeRight: 'strokeColor',
        titleRight: '<img src="resources/inspector-icons/strokecolor.svg" class="inspector-icon"/>',
        leftTooltip: 'Stroke Color',
        titleLeft: '<img src="resources/inspector-icons/fillcolor.svg" class="inspector-icon"/>',
        rightTooltop: 'Fill Color',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type == 'wickobject' 
                && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            return {
                left: selectionInfo.object.paper.fillColor.toCSS(),
                right: selectionInfo.object.paper.strokeColor.toCSS()
            };
        }, 
        onChangeFn: function (val) {
            var modifyState = {};
            if(val.left) modifyState.fillColor = val.left;
            if(val.right) modifyState.strokeColor = val.right;
            wickEditor.guiActionHandler.doAction("changePathProperties", modifyState);
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/strokewidth.png" class="inspector-icon"/>',
        tooltip: 'Stroke Width',
        className: 'inspector-input-string-small',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            return selectionInfo.object.paper && selectionInfo.object.paper.strokeWidth;
        }, 
        onChangeFn: function (val) {
            wickEditor.guiActionHandler.doAction("changePathProperties", {
                strokeWidth: eval(val)
            });
            wickEditor.syncInterfaces();
        }
    }));

    /*properties.push(new InspectorInterface.SelectInput({
        title: 'Stroke Caps',
        options: ['Round', 'Square'],
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            if(!selectionInfo.object.paper) return '';
            var c = selectionInfo.object.paper.strokeCap;
            if(c === 'round') {
                return 'Round'
            } else if (c === 'square') {
                return 'Square'
            } else {
                return 'Square';
            }
        }, 
        onChangeFn: function (val) {
            if(!selectionInfo.object.paper) return;
            
            var newCap; 
            var newJoin;
            if(val === 'Square') {
                newCap = 'square';
                newJoin = 'miter';
            } else if (val === 'Round') {
                newCap = 'round';
                newJoin = 'round';
            }

            wickEditor.guiActionHandler.doAction("changePathProperties", {
                strokeCap: newCap,
                strokeJoin: newJoin,
            });
            wickEditor.syncInterfaces();
        }
    }));*/

    properties.push(new InspectorInterface.MultiCheckboxInput({
        title: '',
        icons: [
            'resources/inspector-icons/strokecapround.png',
            'resources/inspector-icons/strokecapsquare.png', 
        ],
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            if(!selectionInfo.object.paper) return '';
            var c = selectionInfo.object.paper.strokeCap;
            return [
                c === 'round',
                c === 'square',
            ];
        }, 
        onChangeFn: function (vals) {
            var s = selectionInfo.object.paper;
            var newCap; 
            var newJoin;
            if(vals[0] && s.strokeCap !== 'round') {
                newCap = 'round';
                newJoin = 'round';
            } else if (vals[1]  && s.strokeCap !== 'square') {
                newCap = 'square';
                newJoin = 'miter';
            }
            wickEditor.guiActionHandler.doAction("changePathProperties", {
                strokeCap: newCap,
                strokeJoin: newJoin,
            });

            wickEditor.syncInterfaces();
        }
    }));

    /*properties.push(new InspectorInterface.CheckboxInput({
        title: 'Closed',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 && selectionInfo.type == 'wickobject' && selectionInfo.object.isPath;
        },
        getValueFn: function () {
            if(!selectionInfo.object.paper) return false;
            return selectionInfo.object.paper.closed;
        }, 
        onChangeFn: function (val) {
            if(!selectionInfo.object.paper) return;
            var closed = selectionInfo.object.paper.closed;
            wickEditor.guiActionHandler.doAction("changePathProperties", {
                closed: !closed
            });
            wickEditor.syncInterfaces();
        }
    }));*/

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/name.svg" class="inspector-icon"/>',
        tooltip: 'Name',
        isActiveFn: function () {
            return selectionInfo.type === 'project';
        },
        getValueFn: function () {
            return wickEditor.project.name;
        }, 
        onChangeFn: function (val) {
            wickEditor.project.name = val;
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.TwoStringInput({
        title: '<img src="resources/inspector-icons/size.svg" class="inspector-icon"/>',
        tooltip: 'Project Size',
        otherTitle: 'x',
        isActiveFn: function () {
            return selectionInfo.type === 'project';
        },
        getValueFn: function () {
            return {
                left: wickEditor.project.width,
                right: wickEditor.project.height
            };
        }, 
        onChangeFn: function (vals) {
            wickEditor.project.width = eval(vals.left);
            wickEditor.project.height = eval(vals.right);
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/framerate.svg" class="inspector-icon"/>',
        tooltip: 'Framerate',
        isActiveFn: function () {
            return selectionInfo.type === 'project';
        },
        getValueFn: function () {
            return wickEditor.project.framerate;
        }, 
        onChangeFn: function (val) {
            wickEditor.project.framerate = eval(val);
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.ColorPickerInput({
        title: '<img src="resources/inspector-icons/paint.svg" class="inspector-icon"/>',
        tooltip: 'Background Color',
        isActiveFn: function () {
            return selectionInfo.type === 'project';
        },
        getValueFn: function () {
            return wickEditor.project.backgroundColor;
        }, 
        onChangeFn: function (val) {
            wickEditor.project.backgroundColor = val;
            wickEditor.syncInterfaces();
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/name.svg" class="inspector-icon"/>',
        tooltip: 'Name',
        isActiveFn: function () {
            return selectionInfo.type === 'frame' && selectionInfo.numObjects === 1;
        },
        getValueFn: function () {
            return selectionInfo.object.name || "";
        }, 
        onChangeFn: function (val) {
            selectionInfo.object.name = val;
            wickEditor.syncInterfaces()
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/framelength.svg" class="inspector-icon"/>',
        tooltip: 'Frame Length',
        isActiveFn: function () {
            return selectionInfo.type === 'frame' && selectionInfo.numObjects === 1;
        },
        getValueFn: function () {
            return selectionInfo.object.length;
        }, 
        onChangeFn: function (val) {
            wickEditor.actionHandler.doAction('changeFrameLength', {
		        frame: selectionInfo.object, 
		        newFrameLength: eval(val)
		    });
        }
    }));

    properties.push(new InspectorInterface.StringInput({
        title: 'Volume',
        isActiveFn: function () {
            return selectionInfo.dataType === 'sound' && selectionInfo.numObjects === 1;
        },
        getValueFn: function () {
            return selectionInfo.object.volume;
        }, 
        onChangeFn: function (val) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    volume: eval(val),
                }]
            });
        }
    }));

    properties.push(new InspectorInterface.CheckboxInput({
        title: 'Loop',
        isActiveFn: function () {
            return selectionInfo.dataType === 'sound' && selectionInfo.numObjects === 1;
        },
        getValueFn: function () {
            return selectionInfo.object.loop;
        }, 
        onChangeFn: function (val) {
            wickEditor.actionHandler.doAction('modifyObjects', {
                objs: [selectionInfo.object],
                modifiedStates: [{
                    loop: val,
                }]
            });
        }
    }));
    
    properties.push(new InspectorInterface.StringInput({
        title: '<img src="resources/inspector-icons/rotation.svg" class="inspector-icon"/>',
        tooltip: 'Rotations',
        isActiveFn: function () {
            return selectionInfo.type === 'frame' 
                && selectionInfo.numObjects === 1 
                && selectionInfo.object.getCurrentTween();
        },
        getValueFn: function () {
            return selectionInfo.object.getCurrentTween().rotations;
        }, 
        onChangeFn: function (val) {
            var tween = selectionInfo.object.getCurrentTween();
            tween.rotations = parseInt(val);
        }
    }));

    properties.push(new InspectorInterface.MultiCheckboxInput({
        title: '<img src="resources/inspector-icons/ease.svg" class="inspector-icon"/>',
        tooltip: 'Easing Direction',
        icons: [
            'resources/ease-none.png',
            'resources/ease-in.png', 
            'resources/ease-out.png',
            'resources/ease-in-out.png',
        ],
        isActiveFn: function () {
            return selectionInfo.type === 'frame' 
                && selectionInfo.numObjects === 1 
                && selectionInfo.object.getCurrentTween();
        },
        getValueFn: function () {
            var tweenDir = selectionInfo.object.getCurrentTween().tweenDir
            return [
                tweenDir === 'None',
                tweenDir === 'In',
                tweenDir === 'Out',
                tweenDir === 'InOut',
            ];
        }, 
        onChangeFn: function (vals) {
            var tween = selectionInfo.object.getCurrentTween();

            if(vals[0] && tween.tweenDir !== 'None') {
                tween.tweenDir = 'None';
                tween.tweenType = 'Linear'
            } else if (vals[1] && tween.tweenDir !== 'In') {
                tween.tweenDir = 'In';
                tween.tweenType = 'Quadratic';
            } else if (vals[2] && tween.tweenDir !== 'Out') {
                tween.tweenDir = 'Out';
                tween.tweenType = 'Quadratic';
            } else if (vals[3] && tween.tweenDir !== 'InOut') {
                tween.tweenDir = 'InOut';
                tween.tweenType = 'Quadratic';
            }
            wickEditor.syncInterfaces();
        }
    }));

/* Buttons */

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Flip Horizontally",
        icon: "./resources/inspector-flip-horizontally.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('flipHorizontally');
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Flip Vertically",
        icon: "./resources/inspector-flip-vertically.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('flipVertically');
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Delete",
        icon: "./resources/inspector-delete.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("deleteSelectedObjects")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Duplicate",
        icon: "./resources/inspector-duplicate.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("duplicateSelection")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Send to Back",
        icon: "./resources/inspector-send-to-back.png",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("sendToBack")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Bring to Front",
        icon: "./resources/inspector-bring-to-front.png",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("bringToFront")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Move Forwards",
        icon: "./resources/inspector-move-up.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("moveForwards")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Move Backwards",
        icon: "./resources/inspector-move-back.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return (selectionInfo.numObjects > 0 && selectionInfo.type === 'wickobject');
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("moveBackwards")
        }
    }));

    /*properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Edit Code",
        icon: "./resources/inspector-edit-code.svg",
        colorClass: 'common',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type === 'wickobject';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('editScripts');
        }
    }));*/

    properties.push(new InspectorInterface.Divider());

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Group Objects",
        icon: "./resources/group.svg",
        colorClass: 'multiple',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && (selectionInfo.type === 'wickobject' || selectionInfo.type === 'multiple') 
                && selectionInfo.dataType !== 'symbol'
                && selectionInfo.dataType !== 'sound';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("convertToGroup");
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Create Clip from Objects",
        icon: "./resources/inspector-edit-timeline.svg",
        colorClass: 'multiple',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && (selectionInfo.type === 'wickobject' || selectionInfo.type === 'multiple') 
                && selectionInfo.dataType !== 'symbol'
                && selectionInfo.dataType !== 'sound';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("convertToSymbol")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Create Button from Objects",
        icon: "./resources/inspector-button.svg",
        colorClass: 'multiple',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && (selectionInfo.type === 'wickobject' || selectionInfo.type === 'multiple') 
                && selectionInfo.dataType !== 'symbol'
                && selectionInfo.dataType !== 'sound';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("convertToButton")
        }
    }));

    properties.push(new InspectorInterface.Divider());

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Edit Frames",
        icon: "./resources/inspector-edit-timeline.svg",
        colorClass: 'symbol',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type === 'wickobject'
                && selectionInfo.dataType === 'symbol'
                && (!selectionInfo.object.isGroup);
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("editObject")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Edit Group",
        icon: "./resources/group.svg",
        colorClass: 'symbol',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type === 'wickobject'
                && selectionInfo.dataType === 'symbol'
                && selectionInfo.object.isGroup;
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("editObject")
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Break Apart",
        icon: "./resources/inspector-break-apart.svg",
        colorClass: 'symbol',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.type === 'wickobject'
                && selectionInfo.dataType === 'symbol'
                && selectionInfo.object.parentFrame.tweens.length === 0;
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("breakApart")
        }
    }));

    properties.push(new InspectorInterface.Divider());

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Add Frame",
        icon: "./resources/inspector-duplicate.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            var layer = wickEditor.project.getCurrentLayer();
            var playheadPos = wickEditor.project.getCurrentObject().playheadPosition;
            return selectionInfo.numObjects > 0 
                && selectionInfo.dataType === 'frame'
                && !layer.getFrameAtPlayheadPosition(playheadPos);
        },
        buttonAction: function () {
            wickEditor.actionHandler.doAction('addNewFrame');
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Add Tween Keyframe",
        icon: "./resources/tweenpoint-inspector.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.dataType === 'frame'
                && !selectionInfo.object.getCurrentTween();
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('createMotionTween');
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Copy Frame Forward",
        icon: "./resources/inspector-duplicate.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && selectionInfo.dataType === 'frame';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('copyFrameForward')
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Extend Frame To Position",
        icon: "./resources/inspector-flip-vertically.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && selectionInfo.dataType === 'frame';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('extendFrameToPosition')
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Delete Frame(s)",
        icon: "./resources/inspector-delete.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects > 0 
                && selectionInfo.dataType === 'frame';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction("deleteSelectedObjects")
        }
    }));

    /*properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Edit Code",
        icon: "./resources/inspector-edit-code.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.dataType === 'frame';
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('editScripts');
        }
    }));*/

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Delete Motion Tween",
        icon: "./resources/inspector-delete.svg",
        colorClass: 'frames',
        isActiveFn: function () {
            return selectionInfo.numObjects === 1 
                && selectionInfo.dataType === 'frame'
                && selectionInfo.object.getCurrentTween();
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('deleteMotionTween');
        }
    }));

    properties.push(new InspectorInterface.Divider());

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Unite Paths",
        icon: "./resources/inspector-unite.png",
        colorClass: 'all-paths',
        isActiveFn: function () {
            return selectionInfo.numObjects > 1 
                && selectionInfo.special.allPaths;
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('doBooleanOperation', {boolFnName:'unite'});
        }
    }));

    properties.push(new InspectorInterface.InspectorButton({
        tooltipTitle: "Subtract Paths",
        icon: "./resources/inspector-subtract.png",
        colorClass: 'all-paths',
        isActiveFn: function () {
            return selectionInfo.numObjects > 1 
                && selectionInfo.special.allPaths;
        },
        buttonAction: function () {
            wickEditor.guiActionHandler.doAction('doBooleanOperation', {boolFnName:'subtract'});
        }
    }));

    return properties;
}