const ImageField = ({
  source,
  record = {},
  style,
  className = {},
}: {
  source: any;
  record?: any;
  style?: any;
  className?: any;
}) => <img src={record.image || record} style={style} alt="Product" />;
export default ImageField;
