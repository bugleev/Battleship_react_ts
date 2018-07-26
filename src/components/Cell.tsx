import * as React from "react";

interface ICellProps {
  fired: boolean;
  shipArea: boolean;
}

class Cell extends React.Component<ICellProps, any> {
  public shouldComponentUpdate(nextprops) {
    if (
      nextprops.shipArea !== this.props.shipArea ||
      nextprops.fired !== this.props.fired
    ) {
      return true;
    } else {
      return false;
    }
  }
  public render() {
    const classAdd =
      this.props.shipArea && this.props.fired
        ? "hit"
        : this.props.shipArea
          ? "ship"
          : "";
    return (
      <div className={`cell ${classAdd}`}>{this.props.fired ? "X" : null}</div>
    );
  }
}
export default Cell;
