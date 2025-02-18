// 定义 ReSizeBox 组件的属性接口
interface ReSizeBoxProps {
  info: {
    width: number;
    height: number;
    background: string;
  };
}

// 使用属性接口定义 ReSizeBox 组件
const ReSizeBox: React.FC<ReSizeBoxProps> = ({ info }) => {
  return (
    <div
      style={{
        width: info.width,
        height: info.height,
        backgroundColor: info.background,
      }}
    >
      {/* 这里可以添加组件的具体内容 */}
    </div>
  );
};

export default ReSizeBox;
