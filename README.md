# play-with-gas

- Create a Google Spread Sheet document
- Create and publish a .gs script
- Call the API from a React application

A server-side script example:

```js
function doGet(e) {
  if (e.parameter.message) {
    putData(e.parameter.message)
  } else {
    var data = fetchSheetDataJson();
    return ContentService.createTextOutput(data);
  }
}

function putData(message) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');    
  sheet.appendRow([new Date().getTime(), message]);
}

function fetchSheetDataJson() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');  
  var values = sheet.getDataRange().getValues();
  var json = createJson(values);
  return json;
}


function createJson(data) {
  const records = []
  const headers = data[0];
  for (var i = 1; i < data.length; i++) {
    var rec = createRecord(headers, data[i]);
    records.push(rec);
  }
  return JSON.stringify(records);
}

function createRecord(headers, values) {
  const rec = {};
  for (var i = 0; i < headers.length; i++) {
    rec[headers[i]] = values[i];
  }
  return rec;
}
```
