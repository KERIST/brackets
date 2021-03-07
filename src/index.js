module.exports = function check(str, bracketsConfig) {
  let isFukingLineExists = false;
  let fukingLinesPositions = [];
  let fukingElements = [];
  let storage = [];
  let result = true;
  let openBrackets = bracketsConfig.filter(elem => {
    if(elem[0] !== elem[1]) {return elem[0];}else{isFukingLineExists=true; fukingElements.push(elem[0])}
  }).map(elem => elem[0]);
  let closedBrackets = bracketsConfig.filter(elem => {if(elem[0] !== elem[1]) return elem[1];}).map(elem => elem[1]);
  for(let letter of str) {
    if(openBrackets.includes(letter)) {
      storage.push(letter);
    } else if(closedBrackets.includes(letter)) {
      const openPair = openBrackets[closedBrackets.indexOf(letter)] 
      if(storage[storage.length - 1] === openPair){ 
          storage.splice(-1,1)
      }else{ 
          storage.push(letter)
          break 
      }
    }
  }
  if(isFukingLineExists) {
    fukingElements.forEach((fukingElement) => {
      fukingLinesPositions = [];
      if(!result) return;
      str.split('').forEach((elem, index) => {
        if(elem === fukingElement) fukingLinesPositions.push(index);
      })

      if(fukingLinesPositions.length % 2 !== 0) return false;

      for(let i = 0; i < fukingLinesPositions.length; i = i + 2) {
        if((Math.abs(fukingLinesPositions[i] - fukingLinesPositions[i+1]) - 1 ) % 2 !== 0) {
          result = false;
        }
      }
    })
  }
  return result && (storage.length === 0)
}
