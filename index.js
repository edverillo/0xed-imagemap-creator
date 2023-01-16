let $ = (component) => (...args) => React.createElement(component, ...args)

let createTags = (...tags) => {
    let result = {}
    for(let tag of tags) {
        result[tag] = $(tag);
    }
    return result
}

let $tags = createTags(
    'div', 'h1', 'h2', 'p', 'main', 
    'article', 'button', 'span', 'canvas',
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
    );
})

let $loadImage = $(() => {
    return $tags.main({},
        $tags.button({ id: 'from-PC' },
            'Select image from my PC'
        ),
        $tags.span({},
            '-- OR --'
        ),
        $tags.button({ id: 'from-website' },
            'Load image from website'
        ),
    )
})

let $areaTable = $(() => {
    return $tags.div({ id: 'area-table' },
        $tags.table({},
            $tags.thead({},
                $tags.tr({},
                    $tags.th({},
                        'Active'
                    ),
                    $tags.th({},
                        'Shape'
                    ),
                    $tags.th({},
                        'Link'
                    ),
                    $tags.th({},
                        'Title'
                    ),
                    $tags.th({},
                        'Target'
                    ),
                    $tags.th({},
                        ''
                    ),
                )
            ),
            $tags.tbody({},
                
            )            
        ),
        $tags.button({ id: 'add-area'},
            'Add new area'
        )
    )
})

let $areaEditor = $(() => {
    return $tags.div({ id: 'area-editor' },
        $tags.canvas(),
        $areaTable(),
        $tags.button({ id: 'show-code' },
            'Show me the code!'
        ),
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
                'Originally introduced in HTML 3.2 as a replacement for server side imagemaps. Server side image maps were clunky requiring a round trip to the web server to determine where to go based on the coordinates clicked in the image. Thus client side image-maps were born!'
            ),
            $tags.p({},
                'An imagemap is a graphic image where a user can click on different parts of the image and be directed to different destinations. imagemaps are made by defining each of the hot areas in terms of their x and y coordinates (relative to the top left hand corner). With each set of coordinates, you specify a link that users will be directed to when they click within the area.'
            ),
            $tags.p({},
                'As an example, say you have a map of the World that you wish to act as an image map. Each country could have their hot areas defined on the map to take you to different pages.'
            ),
        ),
        $article({ title: 'About' },
            $tags.p({},
                'We make it extremely easy to create free HTML based image maps. Our tool was build from the ground up with the modern browsers in mind, and sadly in turn doesn\'t support older browsers (sorry IE8 and lower!). All operations are completely client side in your browser using the power of HTML5, SVG and JavaScript.'
            ),
            $tags.p({},
                'Disclaimer: No image from your PC are ever transferred out of your browser. All files loaded from your PC are read using the FileReader JavaScript API directly off your hard drive in to your browser.'
            ),            
        )        
    )
})

let $app = $(() => {
    return $tags.div({ className: 'content' },
        $howItWorks(),
        $loadImage(),
        $areaEditor(),
        $articleGroup(),
    )
})

let domContainer = document.querySelector('#root')
let root = ReactDOM.createRoot(domContainer)
root.render($app())