document.addEventListener('DOMContentLoaded', async () => {
    const bg = chrome.extension.getBackgroundPage()
    const wrapper = document.createElement('div')
    var dict = {}

    let p1 = new Promise(async (resolve, reject) => {
        for (let i = 0; i < Object.keys(bg.urls).length; i++) {
            const element = Object.keys(bg.urls)[i];
            let res = fetch('http://127.0.0.1:5000/predict?url=' + element, { method: 'POST' })
            await res.then(async response => {
                // console.log('not final');
                // console.log(response.headers.get('content-type'))
                await response.text().then(predictedCategory => {
                    if (dict.hasOwnProperty(predictedCategory))
                        dict[predictedCategory] = [...dict[predictedCategory], element]
                    else
                        dict[predictedCategory] = [element]
                }).catch(error => console.log(error))
            }).catch((error) => console.log('error =>' + error));
        }
        resolve(dict)
    })

    p1.then(dict => dict)
        .then(dict => {
            console.log('final');
            console.log(JSON.stringify(dict));

            Object.keys(dict).map(category => {
                const category_div = document.createElement('div')
                const category_heading = document.createElement('h1')
                category_heading.textContent = category
                wrapper.appendChild(category_heading)
                const url_list = document.createElement('ol')
                dict[category].map(url => {
                    const url_li = document.createElement('li')
                    url_li.appendChild(document.createTextNode(url))
                    url_list.appendChild(url_li)
                })
                category_div.appendChild(url_list)
                wrapper.appendChild(category_div)
            })
        }).catch(div => {
            document.body.appendChild(div)
        })
    document.body.appendChild(wrapper)
})
