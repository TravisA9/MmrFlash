

var b = `<table id="t01">
...A tool to help you build your own sentences from words: <i>Not yet working!</i><br><br>
  <tr>
    <th>Time</th>
    <th>Noun</th>
    <th>Noun 2</th>
    <th>Verb</th>
    <th>Tense</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>`

function showBuilder(){
  $("text").innerHTML = b;
	$("info").innerHTML = '';
  $('message').innerHTML = ''
}

function UC(){
	$("message").innerHTML = `
  <div style='text-align:center; padding:20px; background:grey; margin:auto;'>
    <span style="display:inline-block;">
      <div style="height:200px;">
        <img src="construction.png" style="position:relative; top:-200px;"/>
      </div>
      <br>Sorry, this option is not yet available.<br>
    	Try again some other time. For now, try another option.<br><br>
    	I recommend: <b>Reading -> Resolving Problems</b>
    </span>
  </div>`;
  $("text").innerHTML = '';
  $("info").innerHTML = '';
}

