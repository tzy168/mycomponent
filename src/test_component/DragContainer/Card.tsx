import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

// 定义卡片的样式
const style = {
  border: "1px dashed gray", // 边框为 1px 虚线灰色
  padding: "0.5rem 1rem", // 内边距为上下 0.5rem，左右 1rem
  marginBottom: ".5rem", // 底部外边距为 0.5rem
  backgroundColor: "white", // 背景颜色为白色
  cursor: "move", // 鼠标指针样式为可移动
  borderRadius: "8px", // 边框圆角为 8px
  transition: "opacity 0.3s ease", // 透明度过渡效果为 0.3 秒，缓动
};

/**
 * Card 组件的属性接口
 * @interface CardProps
 * @property {any} id - 卡片的唯一标识符
 * @property {string} text - 卡片显示的文本内容
 * @property {number} index - 卡片在列表中的索引位置
 * @property {(dragIndex: number, hoverIndex: number) => void} moveCard - 移动卡片的函数，接收拖动卡片的索引和目标位置的索引作为参数
 */
export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

/**
 * 拖动项的接口
 * @interface DragItem
 * @property {number} index - 拖动项在列表中的索引位置
 * @property {string} id - 拖动项的唯一标识符
 * @property {string} type - 拖动项的类型
 */
interface DragItem {
  index: number;
  id: string;
  type: string;
}

/**
 * Card 组件，用于显示可拖动的卡片
 * @param {CardProps} props - 组件的属性
 * @param {any} props.id - 卡片的唯一标识符
 * @param {string} props.text - 卡片显示的文本内容
 * @param {number} props.index - 卡片在列表中的索引位置
 * @param {(dragIndex: number, hoverIndex: number) => void} props.moveCard - 移动卡片的函数，接收拖动卡片的索引和目标位置的索引作为参数
 * @returns {JSX.Element} - 渲染的卡片元素
 */
export const Card: FC<CardProps> = ({ id, text, index, moveCard }) => {
  // 创建一个 ref 用于引用卡片的 DOM 元素
  const ref = useRef<HTMLDivElement>(null);
  // 使用 useDrop 钩子处理卡片的放置逻辑
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    // 接受的拖动项类型为卡片
    accept: ItemTypes.CARD,
    // 收集监视器的信息
    collect(monitor) {
      return {
        // 获取监视器的处理程序 ID
        handlerId: monitor.getHandlerId(),
      };
    },
    /**
     * 当拖动项悬停在卡片上时触发的函数
     * @param {DragItem} item - 拖动的项
     * @param {any} monitor - 拖动监视器
     */
    hover(item: DragItem, monitor) {
      // 如果 ref 没有引用到 DOM 元素，则返回
      if (!ref.current) {
        return;
      }
      // 获取拖动项的索引
      const dragIndex = item.index;
      // 获取当前卡片的索引
      const hoverIndex = index;

      // 如果拖动项和当前卡片是同一个，则返回
      if (dragIndex === hoverIndex) {
        return;
      }

      // 获取当前卡片在屏幕上的矩形区域
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // 计算当前卡片的垂直中间位置
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 获取鼠标的偏移位置
      const clientOffset = monitor.getClientOffset();

      // 计算鼠标相对于当前卡片顶部的像素位置
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // 只有当鼠标越过卡片高度的一半时才执行移动操作
      // 向下拖动时，只有当光标在 50% 以下时才移动
      // 向上拖动时，只有当光标在 50% 以上时才移动

      // 向下拖动
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖动
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 执行移动卡片的操作
      moveCard(dragIndex, hoverIndex);

      // 注意：这里直接修改了监视器中的 item 对象！
      // 一般来说，最好避免直接修改对象，但为了性能考虑，这里这样做可以避免昂贵的索引搜索。
      item.index = hoverIndex;
    },
  });

  // 使用 useDrag 钩子处理卡片的拖动逻辑
  const [{ isDragging }, drag] = useDrag({
    // 拖动项的类型为卡片
    type: ItemTypes.CARD,
    // 返回拖动项的数据
    item: () => {
      return { id, index };
    },
    // 收集监视器的信息
    collect: (monitor: any) => ({
      // 判断是否正在拖动
      isDragging: monitor.isDragging(),
    }),
  });

  // 根据是否正在拖动设置卡片的透明度
  const opacity = isDragging ? 0 : 1;
  // 将拖动和放置的处理程序应用到 ref 引用的 DOM 元素上
  drag(drop(ref));
  // 返回渲染的卡片元素
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  );
};
