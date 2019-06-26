import * as React from "react";

interface Props {
    onClickOutside: any;
    disabled?: boolean;
}

export default class OutsideClickAlerter extends React.Component<Props> {
    private wrapperRef: any;

    public constructor(props: Props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidUpdate(oldProps: Props) {
        if (this.props.disabled && !oldProps.disabled) {
            document.removeEventListener("mousedown", this.handleClickOutside);
        } else if (!this.props.disabled && oldProps.disabled) {
            document.addEventListener("mousedown", this.handleClickOutside);
        }
    }

    public componentDidMount() {
        if (!this.props.disabled) {
            document.addEventListener("mousedown", this.handleClickOutside);
        }
    }

    public componentWillUnmount() {
        if (!this.props.disabled) {
            document.removeEventListener("mousedown", this.handleClickOutside);
        }
    }

    public render(): React.ReactElement<{}> {
        return (
            <div ref={this.setWrapperRef}>
                { this.props.children }
            </div>
        );
    }

    private setWrapperRef(node: any) {
        this.wrapperRef = node;
    }

    private handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onClickOutside();
        }
    }
}
