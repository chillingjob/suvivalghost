'use client'

import { useState } from 'react';

// o = พื้น , 1 = กำแพง , 2 = ผู้เล่น(ที่จุดเริ่มต้น)
const arr = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //y = 0 ส่วนข้างในเป็น x
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 1], //y = 1 ส่วนข้างในเป็น x
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], //y = 1 ส่วนข้างในเป็น x
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //y = 2 ส่วนข้างในเป็น x
];

let player_position = {
  x: 0,
  y: 0,
};


//ให้เอา map ดึงตำแหน่งผู้เล่นเริ่มต้นออกมาเก็บไว้ใน position เพื่อใช้ในการปรับตำแหน่งผู้เล่นเมื่อมีการเคลื่อนไหว
for (let i = 0; i < arr.length; i++) {
  //console.log(""+arr[i]);
  let arr_y = arr[i];
  for (let j = 0; j < arr_y.length; j++) {
    let arr_x = arr_y[j];
    if (arr_x == 2) {
      //console.log("เจอผู้เล่นแล้ว");
      player_position.y = i;
      player_position.x = j;
      console.log("position y : " + player_position.y);
      console.log("position x : " + player_position.x);
      console.log("แผนที่เริ่มต้น : " + arr[0]);
      console.log("แผนที่เริ่มต้น : " + arr[1]);
      console.log("แผนที่เริ่มต้น : " + arr[2]);
      console.log("แผนที่เริ่มต้น : " + arr[3]);
    }
  }
}

//เก็บตำแหน่งกำแพง(ค่า 1) ทุกจุด ไว้เช็คว่าผู้เล่นเดินชนกำแพงหรือเปล่า
type WallPos = {
  x: number,
  y: number,
};
let arr_wall: WallPos[] = [];
for (let i = 0; i < arr.length; i++) {
  //console.log(""+arr[i]);
  let arr_y = arr[i];
  for (let j = 0; j < arr_y.length; j++) {
    let arr_x = arr_y[j];
    if (arr_x == 1) {
      //เก็บตำแหน่งกำแพงว่าอยู่ตรงไหนบ้างใช้รูปแบบ array แล้วเก็บ object ลงไป
      arr_wall.push(
        {
          y: i,
          x: j,
        }
      );
      // player_position.y = i;
      // player_position.x = j;
    }
  }
}
//console.log("arr_wall : "+arr_wall);

function ShowMap() {
  console.log("แผนที่เริ่มต้น : " + arr[0]);
  console.log("แผนที่เริ่มต้น : " + arr[1]);
  console.log("แผนที่เริ่มต้น : " + arr[2]);
  console.log("แผนที่เริ่มต้น : " + arr[3]);
}

export default function Page() {

  //let player = 2;

  const [movementClick, setMovementClick] = useState<string>("");
  const [walkStatus, setWalkStatus] = useState<string>("ผู้เล่นหยุดนิ่ง");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, direction: string) => {
    //alert("คลิ้กแล้วจ้า : "+direction);
    // console.log("arr : "+ arr[1][1]);
    // arr[1][1] = 5;
    // console.log("arr update : "+arr[1][1]);
    //setMovementClick(direction);

    if (direction == "w") {
      let chkPath = player_position.y - 1;
      for (let i = 0; i < arr_wall.length; i++) {
        if (arr_wall[i].x == player_position.x && arr_wall[i].y == chkPath) {
          //console.log("ผู้เล่นชนกำแพงแล้ว");
          setWalkStatus("คุณชนกำแพงแล้ว");
          ShowMap();
          return false;
        }
      }

      player_position.y -= 1;
      setWalkStatus("กำลังเดินไปข้างหน้า");
      arr[player_position.y + 1][player_position.x] = 0;
      arr[player_position.y][player_position.x] = 2;
    }
    else if (direction == "a") {
      let chkPath = player_position.x - 1;
      for (let i = 0; i < arr_wall.length; i++) {
        if (arr_wall[i].y == player_position.y && arr_wall[i].x == chkPath) {
          //console.log("ผู้เล่นชนกำแพงแล้ว");
          setWalkStatus("คุณชนกำแพงแล้ว");
          ShowMap();
          return false;
        }
      }

      player_position.x -= 1;
      setWalkStatus("กำลังเดินไปทางซ้าย");
      arr[player_position.y][player_position.x + 1] = 0;
      arr[player_position.y][player_position.x] = 2;
      ShowMap();
    }
    else if (direction == "s") {
      let chkPath = player_position.y + 1;
      for (let i = 0; i < arr_wall.length; i++) {
        if (arr_wall[i].x == player_position.x && arr_wall[i].y == chkPath) {
          //console.log("ผู้เล่นชนกำแพงแล้ว");
          setWalkStatus("คุณชนกำแพงแล้ว");
          ShowMap();
          return false;
        }
      }

      player_position.y += 1;
      setWalkStatus("กำลังเดินถอยหลัง");
      arr[player_position.y - 1][player_position.x] = 0;
      arr[player_position.y][player_position.x] = 2;
      ShowMap();
    }
    else if (direction == "d") {
      let chkPath = player_position.x + 1;
      for (let i = 0; i < arr_wall.length; i++) {
        if (arr_wall[i].y == player_position.y && arr_wall[i].x == chkPath) {
          //console.log("ผู้เล่นชนกำแพงแล้ว");
          setWalkStatus("คุณชนกำแพงแล้ว");
          ShowMap();
          return false;
        }
      }

      player_position.x += 1;
      setWalkStatus("กำลังเดินไปทางขวา");
      arr[player_position.y][player_position.x - 1] = 0;
      arr[player_position.y][player_position.x] = 2;
      ShowMap();
    }

    //console.log("แสดงตำแหน่งผู้เล่น : ", player_position);
  };


  return (
    <div className="flex flex-col justify-center items-center bg-red-400 h-screen">
      <div>
        <h1 className="text-black text-center text-5xl font-bold">เกมไล่ผีอะไรก็ไม่รู้</h1>
      </div>
      <br />
      {
        arr.map((row, y) => (
          <div key={y} className="flex">
            {
              row.map((cell, x) => {
                let bgColor = "bg-gray-400";
                let cellValue = cell;

                if (cell === 1) {
                  bgColor = "bg-gray-900";
                }
                else if (cell === 2) {
                  bgColor = "bg-yellow-400";
                }

                return (
                  <div
                    key={`${y}-${x}`}
                    className={`
                      w-8 h-8 border border-gray-600 flex 
                      items-center justify-center text-xs font-bold ${bgColor}
                      `}
                  >
                    {cellValue}
                  </div>
                );
              })
            }
          </div>
        ))
      }
      <br />
      <div className="flex flex-row">
        <div className="justify-center items-center bg-black w-200 h-100">
          <h1 id="showText" className="text-red-500 text-3xl font-bold text-center flex flex-col justify-end h-64 m-20">{walkStatus}</h1>
        </div>
        <div className="flex flex-col">
          <div className="space-x-4 p-10">
            <button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => handleClick(e, "w")}>เดินหน้า</button>
            <button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => handleClick(e, "a")}>เดินซ้าย</button>
            <button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => handleClick(e, "d")}>เดินขวา</button>
            <button className="bg-blue-600 hover:bg-blue-700" onClick={(e) => handleClick(e, "s")}>เดินหันหลัง</button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">Inventory</h3>
          </div>
        </div>
      </div>
    </div>
  );
}