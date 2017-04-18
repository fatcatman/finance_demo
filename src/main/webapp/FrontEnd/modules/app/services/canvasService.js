exports.drawCircle = function (context, x, y, r, color) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    //不关闭路径路径会一直保留下去，当然也可以利用这个特点做出意想不到的效果
    context.closePath();
    context.fillStyle = color;
    context.fill();
}