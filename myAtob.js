function myAtob(encoded) {
    // base cases lines 9-11
    if(!encoded.length) return encoded;
    let regEx = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
    if(!regEx.test(encoded)) throw new Error('Not a Valid Base64 Encoding')
    
    //too lazy to write out a key value pair. Ideally there would be some sort of enum struct already defined
    const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').reduce((accumulator, value, i) => {
      return {...accumulator, [value]: i};
    }, {});
  
    let binaryStr='', binaryArr = [];
    
    // convert to 6 bit binary and append to binaryStr
    for(let i = 0; i < encoded.length; i++) {
       if(encoded.charAt(i) === '='){
         binaryStr += encoded.charAt(i)
       }
       else if(base64[encoded[i]] > -1) {
        binaryStr += base64[encoded.charAt(i)].toString(2).padStart(6, '0');
      }
       else throw new Error(encoded.charAt(i)+' is not a base64 character');
    }
    
    // convert to 8-bit binary array
    binaryArr = binaryStr.match(/.{1,8}/g);
  
  // reduce binaryArr to produce ASCII value  
    return binaryArr.reduce((accumulator, current) => {
      return accumulator += current.includes('=') ? '' : String.fromCharCode(parseInt(current, 2));
    }, '');
  }