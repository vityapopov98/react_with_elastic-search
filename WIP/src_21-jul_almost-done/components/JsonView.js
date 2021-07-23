import React from 'react'
import '../index.css'
import './JsonView.css'
import rules from '../rules.json'

function JsonView({comments}){
    // const elementsArray = []
    const jsonCards =  comments.map(element=> {
        // return (<p key={element._id}> element {element._id} </p>)
        return (
            <div className="card" key={element._source.id.toString()}>
                {console.log(element._source.id.toString())}
                <pre> {JSON.stringify(element, null, '\t')} 
                {/* {highlighter(JSON.stringify(element, null, '\t'))} */}
                {/* {highlight(JSON.stringify(element, null, '\t'))}
                {elementsArray.splice(0, elementsArray.length)} */}
                </pre>
            </div>
            
        )
    })


    // function highlighter(code) {
    //     // var code = codeElement;
    //     // getDataFromServer('./config/js-rules.json', function (rules) {
    //     //   var result = parser(rules)('', code);
    //     //   codeElement.innerHTML = result;
    //     // })
    //     fetch('/getColors').then(res=> {return res.json()}).then(rules=>{
    //         console.log('pase param code ', code)
    //         var result = parser(rules)('', code);
    //       return result;
    //     })
        
    //     function parser(rules) {
    //       return function reducer(resultCode, currentCode) {
    //           console.log('reducer params ', resultCode, currentCode)
    //         if (currentCode === '') return resultCode;
    //         for (var ruleName in rules) {
    //           if (rules.hasOwnProperty(ruleName)) {
    //               console.log(rules)
    //             var rule = rules[ruleName];
    //             console.log(rule)
    //             var regexp = rule.regexp;
    //             console.log(regexp)
    //             console.log(currentCode)
                
    //             var result = RegExp(regexp).exec(currentCode);
    //             if (result) {
    //               if (!rule.color) resultCode += result[1]
    //             //   else resultCode += `<span style="color: ${rule.color}">${result[1]}</span>`
    //               else resultCode += <span style={{color: rule.color}}>{result[1]}</span>
    //               currentCode = currentCode.replace(regexp, '');
    //               return reducer(resultCode, currentCode);
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    
// ------LAST TRY ---------
    // function highlight(code){
    //     console.log(code, elementsArray)
    //     var blockResult = ''
    //     for (var ruleName in rules) {
    //         if (rules.hasOwnProperty(ruleName)) {
    //         console.log(rules)
    //           var rule = rules[ruleName];
    //           console.log(rule)
    //           var regexp = rule.regexp;
    //           console.log(regexp)
    //           console.log(code)
              
    //           var result = RegExp(regexp).exec(code);
    //           /^(\\s+)/.exec(code)
    //          console.log('RES', result)
    //          if(result){
    //              blockResult += result[0]
    //          }
    //          console.log('Block res', blockResult)
    //         //   if (result) {
    //         //     if (!rule.color) resultCode += result[1]
    //         //   //   else resultCode += `<span style="color: ${rule.color}">${result[1]}</span>`
    //         //     else resultCode += <span style={{color: rule.color}}>{result[1]}</span>
    //         //     currentCode = currentCode.replace(regexp, '');
    //         //     return reducer(resultCode, currentCode);
    //         //   }
    //         }
    //       }
    // }
    
    // function highlight(object){
    //     console.log(object, elementsArray)
    //     for (const key in object) {
    //         if (object.hasOwnProperty.call(object, key)) {
    //             const element = object[key];
    //             console.log('element', element)
    //             if (typeof(element) == 'string') {
    //                 elementsArray.push(<span style={{color: 'red'}}>"{element}"</span>)
    //             }
    //             else if (typeof(element) == 'number'){
    //                 elementsArray.push(<span style={{color: 'green'}}>{element}</span>)
    //             }
    //             else if (typeof(element) == 'object') {
    //                 highlight(element)
    //             }
    //             else {
    //                 elementsArray.push(<span style={{color: 'blue'}}>{element}</span>)
    //             }
    //             console.log(elementsArray)
    //             return elementsArray
    //         }
    //     }
    // }
    

    return (
        
        <div className="container">
            {jsonCards}
        </div>
    )
}


export default JsonView