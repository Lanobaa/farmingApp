import React, {useRef, useState, useEffect} from 'react';
import './index.scss';
import pump from '../../assets/pump.png';
import meter from '../../assets/meter.png';
import pool from '../../assets/pool.png';
import bucket from '../../assets/bucket.png';
import what from '../../assets/what.png';
import farmland from '../../assets/farmland1.png';
import wendu from '../../assets/wendu.png';
import shidu from '../../assets/shidu.png';
import Curve from '../Curve';


const drawLine = (ctx, points) => {
  ctx.strokeStyle = '#DDDDDD';
  ctx.lineWidth = 14;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach(item => {
    ctx.lineTo(item[0], item[1]);
  });
  ctx.stroke();
};
const draw = canvas => {
  const ctx = canvas.getContext('2d');
  let onePoints = [
    [0, 100],
    [350, 100],
    [350, 50],
    [580, 50],
  ];

  let twoPoints = [
    [600, 50],
    [890, 50],
    [890, 100],
    [980, 100],
  ];

  let threePoints = [
    [190, 270],
    [840, 270],
    [840, 57],
  ];

  let fourPoints = [
    [1000, 87],
    [1350, 87],
    [1350, 237],
  ];

  let fivePoints = [
    [1350, 250],
    [1350, 430],
    [1070, 430],
    [1070, 498],
  ];

  let sixPoints = [
    [1350, 250],
    [1350, 430],
    [290, 430],
    [290, 498],
  ];


  drawLine(ctx, onePoints);
  drawLine(ctx, twoPoints);
  drawLine(ctx, threePoints);
  drawLine(ctx, fourPoints);
  drawLine(ctx, fivePoints);
  drawLine(ctx, sixPoints);


};


const SketchMap = () => {
  const canvasRef = useRef(null);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const speed = 10;
  useEffect(() => {
    const canvas = document.getElementById('waterSketch');
    if (canvas.getContext) {
      draw(canvas);
    } else {
      console.log('您的浏览器不支持Canvas')
    }
  }, []);

  const drawLines = (ctx, x1, y1, x2, y2) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    // ctx.restore();
  };

  const lineMove = (points, color1, color2, cx1, cy1, cx2,cy2) => {
    let ele = canvasRef.current;
    let ctx = ele.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    let grd = ctx.createLinearGradient(cx1, cy2, cx2, cy2);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    ctx.strokeStyle = grd;

    if (points.length < 2) {
      return;
    }
    const [[x1, y1], [x2, y2]] = points;
    let dx = x2 - x1;
    let dy = y2 - y1;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      points = points.slice(1);
      lineMove(points, color1, color2,  cx1, cy1, cx2,cy2);
      return;
    }
    let x = x1,
        y = y1;
    if (dx === 0) {
      x = x2;
      y += (speed * dy) / Math.abs(dy);
    } else if (dy === 0) {
      x += (speed * dx) / Math.abs(dx);
      y = y2;
    } else if (Math.abs(dx) >= 1) {
      let rate = dy / dx;
      x += (speed * dx) / Math.abs(dx);
      y += (speed * rate * dx) / Math.abs(dx);
    }
    drawLines(ctx, x1,y1, x, y);
    points[0] = [x, y];
    window.requestAnimationFrame(function() {
      lineMove(points, color1, color2,  cx1, cy1, cx2,cy2);
    })
  };

  const inWaterSwitch = () => {
    let onePoints = [
      [0, 100],
      [350, 100],
      [350, 50],
      [580, 50],
    ];
    lineMove(onePoints, '#8BB5FF', '#193ffe', 0, 100, 580, 50);
    setActive1(true);
  };

  const outWaterSwitch = () => {
    let twoPoints = [
      [600, 50],
      [890, 50],
      [890, 100],
      [980, 100],
    ];
    lineMove(twoPoints, '#8BB5FF', '#193ffe', 600,50, 980, 100);
    setActive2(true);
  };

  const openSwitch = () => {
    let fourPoints = [
      [1000, 87],
      [1350, 87],
      [1350, 237],
    ];
    lineMove(fourPoints, '#8BB5FF', '#193ffe', 1000,80, 1350, 237);
    setActive3(true);
  };

  const manureSwitch = () => {
    let threePoints = [
      [190, 270],
      [840, 270],
      [840, 50],
      [890, 50],
      [890, 100],
      [980, 100],
    ];
    lineMove(threePoints, '#8BB5FF', '#193ffe', 190,270, 980, 100);
    setActive5(true);
  };

  const outManureSwitch = () => {
    outManureSwitch2();
    let fivePoints = [
      [1350, 250],
      [1350, 430],
      [1070, 430],
      [1070, 498],
    ];
    lineMove(fivePoints, '#8BB5FF', '#193ffe', 1350,250, 1070, 490);
    setActive4(true);
  };

  const outManureSwitch2 = () => {
    let sixPoints = [
      [1350, 250],
      [1350, 430],
      [290, 430],
      [290, 498],
    ];
    lineMove(sixPoints, '#8BB5FF', '#193ffe', 1350,250, 290, 490);
  };

  return (
      <div className="sketch">
        <div className="s_title">
          水肥系统示意图
        </div>
        <div className="sketch-wrap">
          <canvas
              ref={canvasRef}
              id="waterSketch"
              width="1400"
              height="700"
              onClick={e => {

              }}
          >您的浏览器不支持canvas
          </canvas>

          <div className="pump">
            <img src={pump} alt=""/>
            <span>水泵</span>
          </div>
          <div className="meter">
            <img src={meter} alt=""/>
            <span>水表</span>
          </div>
          <div className={`valve ${active1 ? 'active' : ''}`} onClick={inWaterSwitch}>
            <span>进水开关</span>
          </div>
          <div className="pools">
            <img src={pool} alt=""/>
            <span>蓄水池</span>
          </div>
          <div className={`valve2 ${active2 ? 'active2' : ''}`} onClick={outWaterSwitch}>
            <span>出水开关</span>
          </div>
          <div className="bucket">
            <img src={bucket} alt=""/>
            <span>肥料罐</span>
            <p>——肥料液位置：3456</p>
          </div>
          <div className={`open ${active3 ? 'active3' : ''}`} onClick={openSwitch}>
            <span>肥料罐开关</span>
          </div>
          <div className={`valve4 ${active4 ? 'active4' : ''}`} onClick={outManureSwitch}>
            <span>出肥开关</span>
          </div>
          <div className="what">
            <span>主管压力</span>
            <img src={what} alt=""/>
          </div>

          <div className={`valve5 ? ${active5 ? 'active5' : ''}`} onClick={manureSwitch}>
            <span>进肥料开关</span>
          </div>

          <div className="manure">
            <img src={pump} alt=""/>
            <span>肥料泵</span>
          </div>

          <div className="farmlandOne">
            <img src={farmland} alt=""/>
            <span>田地一号</span>
          </div>
          <div className="farmlandTwo">
            <img src={farmland} alt=""/>
            <span>田地二号</span>
          </div>

          <div className="temperature">
            <img src={wendu} alt=""/>
            <span>土壤温度：36</span>
          </div>
          <div className="humidity">
            <img src={shidu} alt=""/>
            <span>土壤湿度：23</span>
          </div>
        </div>
        <Curve />
      </div>
  )
};

export default SketchMap;
