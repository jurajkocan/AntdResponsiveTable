/**
 * This component will render classic ant table with no changes
 * Unless the props 'ViewPortWidth' is less than prop 'MobileBreakPoint'
 * then it will render custom html for responsive design
 */

import Card, { CardProps } from "antd/lib/card";
import Divider from "antd/lib/divider";
import Pagination from "antd/lib/pagination";
import Spin from "antd/lib/spin";
import Table, { ColumnProps, TableProps } from "antd/lib/table";
import * as React from "react";
import { style, media, getStyles } from "typestyle";

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const head = document.head || document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  head.appendChild(styleTag);

  styleTag.type = "text/css";
  styleTag.appendChild(document.createTextNode(getStyles()));
}
const ResponsiveTableStyle = {
  showOnBreakPoint: (breakPoint: number, display: string = "block") =>
    style(
      {
        display: "none"
      },
      media(
        { maxWidth: breakPoint },
        {
          display
        }
      )
    ),

  hideOnBreakPoint: (breakPoint: number, display: string = "block") =>
    style(
      {
        display
      },
      media(
        { maxWidth: breakPoint },
        {
          display: "none"
        }
      )
    ),

  customRow: style({}),

  spinContainer: style({
    display: "block",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 4,
    maxHeight: 360
  }),

  spin: style({
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-10px"
  }),

  spinBlur: style({
    pointerEvents: "none",
    userSelect: "none",
    overflow: "hidden",
    opacity: 0.5,
    "-webkit-filter": "blur(0.5px)",
    filter: "blur(0.5px)",
    transition: "opacity 0.3s",
    zoom: 1
  })
};

export type additionalCols = ColumnProps<any> & {
  showOnResponse: boolean;
  showOnDesktop: boolean;
};

export type props = {
  antTableProps: TableProps<any> & {
    columns: additionalCols[];
  };
  cardProps: CardProps;
  mobileBreakPoint: number;
};

class ResponsiveTable extends React.Component<props> {
  constructor(props: props) {
    super(props);
  }

  public render() {
    const desktopTableProps = this.props.antTableProps;
    // @ts-ignore
    desktopTableProps.columns = desktopTableProps.columns.filter(
      (col: additionalCols) => col.showOnDesktop
    );

    return (
      <div>
        <div
          className={ResponsiveTableStyle.hideOnBreakPoint(
            this.props.mobileBreakPoint
          )}
        >
          <Table {...desktopTableProps} />
        </div>

        <div
          className={ResponsiveTableStyle.showOnBreakPoint(
            this.props.mobileBreakPoint
          )}
        >
          <div
            className={
              this.props.antTableProps.loading
                ? ResponsiveTableStyle.spinBlur
                : ""
            }
          >
            {this.props.antTableProps.loading ? (
              <div className={ResponsiveTableStyle.spinContainer}>
                <Spin className={ResponsiveTableStyle.spin} />
              </div>
            ) : null}
            {!this.props.antTableProps.dataSource ? (
              <Table />
            ) : (
              this.props.antTableProps.dataSource.map((rowData, index) => {
                const onRow = this.props.antTableProps.onRow
                  ? { ...this.props.antTableProps.onRow(rowData, index) }
                  : undefined;

                return (
                  <Card key={rowData.key} {...this.props.cardProps} {...onRow}>
                    {this.props.antTableProps.columns
                      ? this.props.antTableProps.columns.map(
                          (colData: additionalCols, index) => {
                            return colData.showOnResponse ? (
                              <div key={`${rowData.key}${colData.key}`}>
                                <div style={{ display: "flex" }}>
                                  <div
                                    style={{
                                      width: "35%",
                                      paddingRight: 5,
                                      textAlign: "right"
                                    }}
                                  >
                                    {colData.title ? (
                                      <b>{colData.title}:</b>
                                    ) : null}
                                  </div>
                                  <div style={{ width: "65%", paddingLeft: 5 }}>
                                    {colData.key
                                      ? colData.render
                                        ? colData.render(
                                            rowData[colData.key],
                                            rowData,
                                            index
                                          )
                                        : rowData[colData.key]
                                      : null}
                                  </div>
                                </div>
                                {this.props.antTableProps.columns ? (
                                  index + 1 ===
                                  this.props.antTableProps.columns
                                    .length ? null : (
                                    <Divider />
                                  )
                                ) : null}
                              </div>
                            ) : null;
                          }
                        )
                      : null}
                  </Card>
                );
              })
            )}
            {this.props.antTableProps.pagination ? (
              <Pagination {...this.props.antTableProps.pagination} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ResponsiveTable;
