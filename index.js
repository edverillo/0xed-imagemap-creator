let useState = React.useState
let useMemo = React.useMemo

let $ = (component) => (...args) => React.createElement(component, ...args)

let getMouseCoordsOnTarget = (e) => {
    let currentTargetRect = e.target.getBoundingClientRect();
    return [
        e.pageX - currentTargetRect.left,
        e.pageY - currentTargetRect.top
    ];
}


let prop = propName => obj => obj[propName]

let $reactPortal = $(({ children, wrapperId }) => {
    return ReactDOM.createPortal(children, document.getElementById(wrapperId))
})

let createTags = (...tags) => {
    let result = {}
    for(let tag of tags) {
        result[tag] = $(tag)
    }
    return result
}

let $tags = createTags(
    'div', 'h1', 'h2', 'p', 'main', 'input', 'label', 'select', 'option',
    'article', 'button', 'span', 'canvas', 'img', 'pre',
    'table', 'thead', 'tbody', 'th', 'tr', 'td'
)

let $howItWorks = $(() => {
    return $article({},
        $tags.h2({},
            'How Does it Work?'
        ),
        $tags.p({},
            'With the help of our generator creating html imagemaps is free and easy. Simply start by selecting an image from your pc, or load one directly from an external website. Next up create your hot areas using either rectangle, circle or polygon shapes. Creating these shapes is as easy as pointing and clicking on your image. Don\'t forget to enter a link, title and target for each of them. Then once you\'re finished simply click Show Me The Code!'
        ),
    )
})

let $portalModal = $(({ shown, title, children, $close, $continue }) => {
    return (
        $reactPortal({ wrapperId: 'portal-root' },
            shown && $tags.div({ className: 'modal--dim' },
                $tags.div({ className: 'modal--window' },
                    $tags.div({ className: 'modal--header' },
                        title
                    ),
                    $tags.div({ className: 'modal--content' },
                        children,
                    ),
                    $tags.div({ className: 'modal--footer' },
                        $tags.button({ className: 'modal--button', onClick: $close },
                            'Close'
                        ),
                        $continue && $tags.button({ className: 'modal--button --primary', onClick: $continue },
                            'Continue'
                        )
                    ),
                )
            )
        )
    )
})

let $loadImage = $(({ $image }) => {
    let [file, $file] = useState()

    let [url, $url] = useState()

    let $urlChange = (e) => {
        $url(e.target.value)
    }

    let [modalShown, $modalShown] = useState(false)

    let $modalClose = () => {
        $modalShown(false)
    }

    let $modalContinue = () => {
        $image(url)
        $url('')
        $modalShown(false)
    }

    let $fromPC = (e) => {
        if (e.target.files) {
            let loadedFile = e.target.files[0]
            $file(loadedFile)
            let reader = new FileReader()
            reader.onload = ee => $image(ee.target.result)
            reader.readAsDataURL(loadedFile)
        }
    }

    let $fromWebsite = () => {
        $modalShown(true)
    }

    return $tags.main({},
        $tags.div({ className: 'from-PC--wrapper' },
            $tags.input({ 
                type: 'file',
                id: 'from-PC--input',
                onChange: $fromPC,
            }),
            $tags.label({ id: 'from-PC--label', htmlFor: 'from-PC--input' },
                'Select image from my PC'
            ),
        ),
        $tags.span({},
            '-- OR --'
        ),
        $tags.button({ id: 'from-website', onClick: $fromWebsite },
            'Load image from website'
        ),
        $portalModal({ 
            shown: modalShown,
            title: 'Load Image from Website',
            $close: $modalClose,
            $continue: $modalContinue,
        },
            $tags.input({ value: url, onChange: $urlChange })
        )
    )
})

let $dataRow = $(({ rowIndex, row, $row, children }) => {
    let $value = (propName) => (newValue) => {
        let newRow = {...row}
        newRow[propName] = newValue
        $row(newRow)
    }

    return $tags.tr({ key: rowIndex },
        children.map((C, CInd) => $tags.td({ key: CInd },
            C.props.children({
                rowIndex,
                value: row[C.props.propName],
                $value: $value(C.props.propName),
            })
        ))
    )
})

let $dataColumn = $(({ children, title, project }) => {
    return $tags.div({})
})

let $dataTable = $(({ children, data, $data }) => {
    let $row = (index) => (newRow) => {
        let newData = [...data]
        newData[index] = newRow
        $data(newData)
    }

    return $tags.table({},
        $tags.thead({},
            $tags.tr({},
                children.map((C, CInd) => $tags.th({ key: CInd },
                    C.props.title
                ))
            )
        ),
        $tags.tbody({},
            data.map((R, RInd) => $dataRow({
                key: RInd,
                children,
                row: R,
                $row: $row(RInd),
                rowIndex: RInd,
            }))
        ),
    )
})

let $figureEditor = $(({ image, activeIndex, activeArea, $activeArea }) => {
    let activeArea = useMemo(() => areas[activeIndex], [areas, activeIndex])

    let $activeArea = (newArea) => {
        let newAreas = [...areas]
        newAreas[activeIndex] = newArea
        $areas(newAreas)
    }

    let $preventDefault = (e) => {
        e.preventDefault()
    }

    document.addEventListener('contextmenu', event => event.preventDefault());

    let addOrHoldPoint = (targetX, targetY) => {
        let newActiveArea = { ...activeArea }
        console.log(targetX, targetY)
    }

    let removePoint = (targetX, targetY) => {
        
    }

    let releasePoint = (targetX, targetY) => {
        
    }

    let movePoint = (targetX, targetY) => {
        
    }

    let $mouseDown = (e) => {
        let [targetX, targetY] = getMouseCoordsOnTarget(e)

        e.preventDefault()
        if (e.button === 0) {
            addOrHoldPoint(targetX, targetY)
        }
        if (e.button === 2) {
            removePoint(targetX, targetY)
        }        
    }

    let $mouseUp = (e) => {
        let [targetX, targetY] = getMouseCoordsOnTarget(e)
        releasePoint(targetX, targetY)
    }

    let $mouseMove = (e) => {
        let [targetX, targetY] = getMouseCoordsOnTarget(e)
        movePoint(targetX, targetY)
    }

    return image && $tags.div({
        className: 'canvas',
        onDragStart: $preventDefault,
        onContextMenu: $preventDefault,
        onMouseDown: $mouseDown,
        onMouseUp: $mouseUp,
        onMouseMove: $mouseMove,
    },
        $tags.img({src: image }),


    )
})

let $areaTable = $(({ areas, $areas, $activeIndex }) => {
    let $addArea = () => {
        $areas([...areas, {
            isActive: false,
            shape: 'circle',
            link: '',
            title: '',
            target: '',
            points: []
        }])
    }

    let $removeArea = (index) => () => {
        let newAreas = [...areas]
        newAreas.splice(index, 1)
        $areas(newAreas)
    }

    return $tags.div({ id: 'area-table' },
        $dataTable({ data: areas, $data: $areas },
            $dataColumn({
                title: 'Active',
                propName: 'isActive',
            },
                ({ rowIndex }) => {
                    let onChange = (e) => {
                        $activeIndex(e.target.value)
                    }

                    return $tags.input({ type: 'radio', name: 'isActive', value: rowIndex, onChange })
                }
            ),
            $dataColumn({
                title: 'Shape',
                propName: 'shape',
            },
                ({ value, $value }) => {
                    let onChange = (e) => {
                        $value(e.target.value)
                    }

                    return $tags.select({ value, onChange },
                        $tags.option({value: null},
                            '---'
                        ),
                        $tags.option({value: 'rectangle'},
                            'Rectangle'
                        ),
                        $tags.option({value: 'polygon'},
                            'Polygon'
                        ),
                        $tags.option({value: 'circle'},
                            'Circle'
                        ),
                    )
                }
            ),
            $dataColumn({
                title: 'Link',
                propName: 'link',
            },
                ({ value, $value }) => {
                    let onChange = (e) => {
                        $value(e.target.value)
                    }

                    return $tags.input({ type: 'text', value, onChange })
                }
            ),
            $dataColumn({
                    title: 'Title',
                    propName: 'title',
                }, 
                ({ value, $value }) => {
                    let onChange = (e) => {
                        $value(e.target.value)
                    }

                    return $tags.input({ type: 'text', value, onChange })
                }
            ),
            $dataColumn({
                    title: 'Target',
                    propName: 'target',
                },
                ({ value, $value }) => {
                    let onChange = (e) => {
                        $value(e.target.value)
                    }

                    return $tags.select({ value, onChange },
                        $tags.option({value: null},
                            '---'
                        ),
                        $tags.option({value: '_blank'},
                            '_blank'
                        ),
                        $tags.option({value: '_parent'},
                            '_parent'
                        ),
                        $tags.option({value: '_self'},
                            '_self'
                        ),
                        $tags.option({value: '_top'},
                            '_top'
                        ),
                    )
                }
            ),
            $dataColumn({
                    title: '',
                }, 
                ({ rowIndex }) => {
                    return $tags.button({ className: 'remove-area', onClick: $removeArea(rowIndex) },
                        'Remove area'
                    )
                }),
        ),
        $tags.button({ id: 'add-area', onClick: $addArea },
            'Add new area'
        )
    )
})

let $showCode = $(({ areas }) => {
    let [modalShown, $modalShown] = useState(false)

    let $modalOpen = () => {
        $modalShown(true)
    }

    let $modalClose = () => {
        $modalShown(false)
    }

    return $tags.div({},
        $tags.button({ 
            id: 'show-code',
            onClick: $modalOpen 
        },
            'Show me the code!',
        ),
        $portalModal({ 
            shown: modalShown,
            title: 'Generated Image Map Output',
            $close: $modalClose,
        },
            $tags.pre({ className: 'code-output' },
                '<!-- Image Map Generated by http://www.image-map.net/ -->\n' +
                '<img src="images.jpeg" usemap="#image-map">\n' +
        
                '<map name="image-map">\n\t' +
                    areas.map((A) => '<area ' + 
                        `target="${A.target}" ` +
                        `alt="" ` +
                        `title="${A.title}" ` +
                        `href="${A.link}" ` +
                        `coords="" ` +
                        `shape="${A.shape}">`
                    ).join('\n\t')
                + '\n</map>'
            )
        )
    )
})

let $areaEditor = $(({ image }) => {
    let [activeIndex, $activeIndex] = useState(-1)
    let [areas, $areas] = useState([])

    return $tags.div({ id: 'area-editor', className: image != '' ? '--shown' : '' },
        $figureEditor({ areas, $areas, activeIndex, image }),
        $areaTable({ areas, $areas, $activeIndex }),
        $showCode({ areas }),
    )
})

let $article = $(({ children, title }) => {
    return $tags.article({},
        $tags.h2({}, title),
        ...children
    )
})

let $articleGroup = $(() => {
    return $tags.div({ className: 'article-group' },
        $article({ title: 'What is an Image Map?' },
            $tags.p({},
                'Client-side image maps were initially introduced to replace server side ones. This type of map required a round trip to the web server in order for the program to determine where an image was being displayed based on coordinates input by the user. Thus, client-side image maps were born!'
            ),
            $tags.p({},
                'An image map is a graphic representation where users can click on different parts of the image to navigate to different destinations. Image maps are created by defining each of the hot areas in terms of their x and y coordinates (relative to the top left corner). With each set of coordinates, you specify a link that users will be directed to when they click within the area.'
            ),
            $tags.p({},
                'As an example, say you have a map of the World that you wish to act as an image map. Each country could have their hot areas defined on the map to take you to different pages.'
            ),
        ),
        $article({ title: 'About' },
            $tags.p({},
                'Our free HTML-based image map tool is designed for modern browsers, and unfortunately it doesn\'t work with older versions of Internet Explorer. All operations are performed on the client side using HTML5, SVG and JavaScript—making this an ideal solution for web designers who want to create responsive images maps without any headaches.'
            ),
            $tags.p({},
                ' Note: Images loaded from your computer are not sent to any third-party servers - they are read directly off of your hard drive into your browser using the FileReader JavaScript API.'
            ),            
        )        
    )
})

let $app = $(() => {
    let [image, $image] = useState('')

    return $tags.div({ className: 'content' },
        $howItWorks(),
        $loadImage({$image}),
        $areaEditor({image}),
        $articleGroup(),
    )
})

let domContainer = document.querySelector('#root')
let root = ReactDOM.createRoot(domContainer)
root.render($app())