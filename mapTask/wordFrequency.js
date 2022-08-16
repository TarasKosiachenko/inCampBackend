function wordFreq(text) {

  let freqMap = {}

	text.split(' ').map(el => {
    !freqMap[el] ? freqMap[el] = 1 : freqMap[el] += 1
  });

  return freqMap
}

console.log(wordFreq("I am a smart a smart intern"));