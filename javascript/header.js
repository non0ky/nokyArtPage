const header = document.querySelector('header');
const head = document.querySelector('head');

header.innerHTML = `
    <div class="tittle">
        <h2 class="n">n</h2>
        <button class="eye" onclick="eye()"><h2 class="o">o</h2></button>
        <h2 class="k">k</h2>
        <h2 class="y">y</h2>
     </div>
            
    <ul>
        <li><a href="../main/main.html">[proyect diagram]</a></li>
        <li><a href="../about artist/aboutArtist.html">[about artist]</a></li>
    </ul>
    <hr>
`; 

//head.innerHTML += `<link rel="stylesheet" href="../styles.css"></link>`;

head.innerHTML += `
<style>
* {
  margin: 0;
}

body {
  background-color: black;
  color: white;
  margin: 0;
  padding: 0;
  font-family: Roboto;
  overflow-x: hidden;
}

header {
  width: hidden;
  height: 5em;
  display: block;
  text-align: center;
  padding: 10px;
}

header ul {
  text-align: center;
  justify-content: space-around;
  display: flex;
}

.tittle{
  background-color: black;
  align-items: center;
  display: inline-flex;
  border: 1px dashed white;
  padding: 5px;
}

.tittle .n {
  color: tomato;
  border: 1px solid white;
  padding: 0px 5px;
  margin: 2px;
}
.tittle .o {
  color: white;
  font-family: 'Roboto Mono', monospace;
  
  font-size: 2em;
  margin-top: 0px;
}

.tittle button {
  background-color: #000000;
  border: none;
}

.tittle button:hover{
  cursor: pointer;
} 

.tittle  .k {
  background: goldenrod;
  color: #000000;
  padding-left: 5px;
  padding-right: 2px;
}
.tittle  .y {
  padding: 0 3px;
  color: seagreen;
  padding: 6px 5px;
}

header li {
  text-align: center;
  list-style-type: none;
  padding: 10px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover {
  animation-name: parpadeo;
  animation-duration: 0.2s;
  animation-iteration-count: infinite;
}

@keyframes parpadeo {
  from {
    color: white;
  }

  to {
    color: black;
  }
}
  </style>
`;

function eye() {
    let button = document.querySelector("button.eye");
    let ran = Math.floor(Math.random() * 5);
    let obj;
    switch(ran){
        case 0:
            obj = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#ffbb00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
            break;
        case 1:
            obj = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffffCCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
            break;
        case 2:
            obj = `<h2 class="o">o</h2>`;
            break;
        case 3:
            obj = `<img src="https://i.pinimg.com/originals/f2/fe/e1/f2fee18928e2a527a800fe311ba4a955.gif" alt="n0o0o0oo" width="25px" height="25px">`;
            break;
        case 4:
            obj = `<h2 class="o">0</h2>`;
            break;
    } 

    button.innerHTML = obj;
} 