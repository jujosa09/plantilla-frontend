const openChat = (idConv) => {
    const idProd = encodeURIComponent(idConv.split("_")[0]);
    const correoVend = encodeURIComponent(idConv.split("_")[1]);
    const correoComp = encodeURIComponent(idConv.split("_")[2]);
    const cifrado = idProd + "_" + correoVend + "_" + correoComp;
    window.location.href = "/chat?id=" + cifrado;
}

const chatService = {openChat}

export default chatService