const deleteProduct = (btn) => {
    const productId = btn.parentNode.querySelector("[name=productId]").value
    const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value
    const articleEle = btn.closest('article');

    fetch("/product/" + productId, {
        method: 'delete',
        headers: { "csrf-token": csrfToken }
    }).then(resp => {
        articleEle.parentNode.removeChild(articleEle);
    }).catch((error) => {
        console.log(error);
    })
    // btn.parentNode.querySelector("[name=productId]").value

}