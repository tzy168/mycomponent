import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const MIN_WIDTH = 200;
const MIN_HEIGHT = 200;
const MAX_WIDTH = 600; // 最大宽度
const MAX_HEIGHT = 600; // 最大高度

export default function ResizeableContainer(props: any) {
  const { children } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300); // 独立的宽度状态
  const [height, setHeight] = useState(300); // 独立的高度状态
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0); // 鼠标按下时的初始 X 坐标
  const [startY, setStartY] = useState(0); // 鼠标按下时的初始 Y 坐标

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      // 仅在点击右下角缩放手柄时启动拖拽
      if (
        e.target instanceof HTMLElement &&
        e.target.classList.contains("resize-handle")
      ) {
        setIsDragging(true);
        setStartX(e.clientX); // 记录鼠标按下时的 X 坐标
        setStartY(e.clientY); // 记录鼠标按下时的 Y 坐标

        // 禁用容器内部的交互，避免图表的功能被触发
        if (container) {
          container.style.pointerEvents = "none"; // 禁用容器内的所有鼠标事件
          container.style.transition = "none";
        }
        if (handle) {
          handle.style.cursor = "se-resize"; // 改变鼠标样式为右下角缩放
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // 计算鼠标移动的差值
      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      // 更新容器的宽高
      const newWidth = Math.max(width + diffX, MIN_WIDTH);
      const newHeight = Math.max(height + diffY, MIN_WIDTH);

      // 限制最小宽度和最小高度
      setWidth(Math.min(newWidth, MAX_WIDTH)); // 限制最大宽度
      setHeight(Math.min(newHeight, MAX_HEIGHT)); // 限制最大高度

      // 更新鼠标起始位置，以便连续更新
      setStartX(e.clientX);
      setStartY(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // 恢复容器内部的交互
      if (container) {
        container.style.pointerEvents = "auto"; // 恢复容器内的所有鼠标事件
      }
    };

    // 绑定事件监听
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // 清理事件监听
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startY, width, height, children]);

  return (
    <div
      className="parent"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div
        ref={containerRef}
        className="container"
        style={{ width: "95%", height: "95%" }}
      >
        {children}
        <div ref={handleRef} className="resize-handle" />
      </div>
    </div>
  );
}
