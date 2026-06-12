document.write('<iframe id="barra-base" src="https://barra.to.gov.br/base.php?saude&ati=1" frameborder="no" scrolling="no" width="100%" height="450px"></iframe>');

var iframeBarraBase = document.getElementById('barra-base');
function postMessageBarraBase(data) { iframeBarraBase.contentWindow.postMessage(data,'https://www.to.gov.br/'); }
