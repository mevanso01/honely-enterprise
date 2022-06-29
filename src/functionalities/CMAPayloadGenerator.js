function generateSideBySidePayload() {
    var indexFieldMap = {
        0: 'SQFT',  // sqft
        1: 'NUM_BEDS',  // beds
        2: 'NUM_BATHS',  // baths
        3: 'YEAR_BUILT',  // yr built
    }
    var sbsPayloadArr = []
    var pika = JSON.parse(window.sessionStorage.getItem('CMA')).array
    var len = pika.length
    var quo = Math.ceil(len/4)
    for (let x=0; x<quo; x++) {
    var sbsPayloadTemplate = {
        "template": "",
        "CUSTOM_LOGO": {
            "type": "text",
            "data": "https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png"
        },
        "ADDRESS_1": {
            "type": "text",
            "data": ""
        },
        "ADDRESS_2": {
            "type": "text",
            "data": ""
        },
        "CITY": {
            "type": "text",
            "data": ""
        },
        "STATE": {
            "type": "text",
            "data": ""
        },
        "ZIP": {
            "type": "text",
            "data": ""
        },
        "PROPERTY_IMG_1": {
            "type": "image",
            "data": ""
        },
        "PROPERTY_ADD_1": {
            "type": "text",
            "data": ""
        },
        "PROPERTY_IMG_2": {
            "type": "image",
            "data": ""
        },
        "PROPERTY_ADD_2": {
            "type": "text",
            "data": ""
        },
        "PROPERTY_IMG_3": {
            "type": "image",
            "data": ""
        },
        "PROPERTY_ADD_3": {
            "type": "text",
            "data": ""
        },
        "PROPERTY_IMG_4": {
            "type": "image",
            "data": ""
        },
        "PROPERTY_ADD_4": {
            "type": "text",
            "data": ""
        },
        "COMPARABLE_LIST": {
            "type": "array",
            "data": {
                "row_class": null,
                "cell_class": [
                   
                ],
                "array": [
                    [
                        "Sq Ft",
                    ],
                    [
                        "Beds",
                    ],
                    [
                        "Baths",
                    ],
                    [
                        "Yr built",
                    ],
                ]
            }
        }
    }
    sbsPayloadTemplate.ADDRESS_1.data = pika[0].ADDRESS_1.data
    sbsPayloadTemplate.CITY.data = pika[0].CITY.data
    sbsPayloadTemplate.STATE.data = pika[0].STATE.data
    sbsPayloadTemplate.ZIP.data = pika[0].ZIP.data
    // console.log('vx: onixlen', len)
        sbsPayloadArr.push({...sbsPayloadTemplate})
    }
    var ptr = 0
    var index = 0
    while(ptr < len) {
        // var sbsPayloadObj = {
        //     ...sbsPayloadTemplate
        // }
        var rem = len - ptr
        rem = rem>4?4:rem
        // console.log('vx: onixrem', rem)
        sbsPayloadArr[index].template = 'template_honely_comparable_' + rem + 'x.html'
        // console.log('vx: rem is ' + rem + ', sbsPayloadObj.template is ' + sbsPayloadObj.template )
        // if (rem >= 4) {
        //     sbsPayloadObj.template = 'template_honely_comparable_4x.html'
        // } else {
            
        // }
        if (rem == 1) {
            sbsPayloadArr[index].COMPARABLE_LIST.data.cell_class = [
                "first-cell border-bottom",
                "border-bottom"
            ]
            delete sbsPayloadArr[index].PROPERTY_ADD_2
            delete sbsPayloadArr[index].PROPERTY_ADD_3
            delete sbsPayloadArr[index].PROPERTY_ADD_4
            delete sbsPayloadArr[index].PROPERTY_IMG_2
            delete sbsPayloadArr[index].PROPERTY_IMG_3
            delete sbsPayloadArr[index].PROPERTY_IMG_4
        }
        else if (rem ==2) {
            sbsPayloadArr[index].COMPARABLE_LIST.data.cell_class = [
                "first-cell border-bottom",
                "border-bottom border-right",
                "border-bottom"
            ]
            delete sbsPayloadArr[index].PROPERTY_ADD_3
            delete sbsPayloadArr[index].PROPERTY_ADD_4
            delete sbsPayloadArr[index].PROPERTY_IMG_3
            delete sbsPayloadArr[index].PROPERTY_IMG_4
        }
        else if (rem == 3) {
            sbsPayloadArr[index].COMPARABLE_LIST.data.cell_class = [
                "first-cell border-bottom",
                "border-bottom border-right",
                "border-bottom border-right",
                "border-bottom"
            ]
            delete sbsPayloadArr[index].PROPERTY_ADD_4
            delete sbsPayloadArr[index].PROPERTY_IMG_4
        }
        else {
            sbsPayloadArr[index].COMPARABLE_LIST.data.cell_class = [
                "first-cell border-bottom",
                "border-bottom border-right",
                "border-bottom border-right",
                "border-bottom border-right",
                "border-bottom"
            ]
        }
        var ptr2 = 1
        for (let x=ptr; x<(ptr+rem); x++) {
            // console.log('vx: ekansx', x)
            // console.log('vx: ekansptr', ptr)
            // console.log('vx: ekansrem', rem)
            // console.log('vx: ekansptr+rem', ptr + rem)
            // vx: construct PROPERTY_IMG_x, PROPERTY_ADD_x,  COMPARABLE_LIST
            sbsPayloadArr[index]['PROPERTY_IMG_' + ptr2 + '']['data'] = pika[x].IMG_LOCATION.data
            sbsPayloadArr[index]['PROPERTY_ADD_' + ptr2 + '']['data'] = pika[x].ADDRESS_1.data + ' ' + pika[x].CITY.data + ' ' + pika[x].STATE.data + ' ' + pika[x].ZIP.data
            for(let y=0; y<4; y++) {
                sbsPayloadArr[index].COMPARABLE_LIST.data.array[y].push(pika[x][indexFieldMap[y]]['data'])
            }
            ptr2++
        }
        // console.log('vx: end of while loop.. about to push sbsPayloadObj', sbsPayloadObj)
        // sbsPayloadArr.push(sbsPayloadObj)
        ptr += 4
        index++
    }
    return sbsPayloadArr
}
export default generateSideBySidePayload;