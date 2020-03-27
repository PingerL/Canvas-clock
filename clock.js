let dom = document.getElementById('clock')
let ctx = dom.getContext('2d')
let width = ctx.canvas.width
let height = ctx.canvas.height
let r = width / 2
let rem = width / 200

function drawBackground(){
  ctx.save()
  ctx.translate(r,r) // 重新定义圆点坐标
  ctx.beginPath()
  ctx.lineWidth = 10 *rem
  ctx.arc(0,0,r-ctx.lineWidth / 2,0,2*Math.PI,false)
  ctx.stroke()

  let hoursNumber = [3,4,5,6,7,8,9,10,11,12,1,2]
  ctx.font = 18 * rem + "px Arial"
  ctx.textAlign="center"
  ctx.textBaseline = "middle"
  hoursNumber.forEach((number,i) => {
    let rad = 2 * Math.PI / 12 *i
    let x = Math.cos(rad) * (r - 30 * rem)
    let y = Math.sin(rad) * (r - 30 * rem)
    ctx.fillText(number,x,y)
  })

  for (let i = 0; i < 60; i++) {
    let rad = 2 * Math.PI / 60 *i
    let x = Math.cos(rad) * (r - 18 * rem)
    let y = Math.sin(rad) * (r - 18 * rem)
    ctx.beginPath()
    if (i % 5 === 0){
      ctx.fillStyle = "#000"
      ctx.arc(x,y,2 * rem,0,2*Math.PI,false)
    } else {
      ctx.fillStyle = "#ccc"
      ctx.arc(x,y,2 * rem,0,2*Math.PI,false)
    }
    ctx.fill()
  }
}

function drawHour(hour,minute){
  ctx.save()
  ctx.beginPath()
  let rad = 2 * Math.PI / 12 * hour
  let mrad = 2 * Math.PI / 12 / 60 * minute
  ctx.rotate(rad+mrad)
  ctx.lineWidth = 6 * rem // 定义时针线的宽度
  ctx.lineCap = "round"
  ctx.moveTo(0, 10 * rem) // 定义时针线的原点
  ctx.lineTo(0, -r / 2)  // 画出时针线
  ctx.stroke()
  ctx.restore()
}
function drawMinute(minute){
  ctx.save()
  ctx.beginPath()
  let rad = 2 * Math.PI / 60 * minute
  ctx.rotate(rad)

  ctx.lineWidth = 3 * rem
  ctx.lineCap = "round"
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.stroke()

  ctx.restore()
}
function drawSecond(second){
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = "red"
  let rad = 2 * Math.PI / 60 * second
  ctx.rotate(rad)
  ctx.moveTo(-2, 20 * rem)
  ctx.lineTo(2, 20 * rem)
  ctx.lineTo(1, -r + 18 * rem)
  ctx.lineTo(-1, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}
function drawDot(){
  ctx.beginPath()
  ctx.fillStyle = "white"
  ctx.arc(0,0,3,0,2*Math.PI,false)
  ctx.fill()
}

function draw(){
  ctx.clearRect(0,0,width,height)
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  drawBackground()
  drawHour(hour,minute)
  drawMinute(minute)
  drawSecond(second)
  drawDot()
  ctx.restore()
}
draw()
setInterval(draw,1000)