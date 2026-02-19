import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

export const DotCircleWithLabelDemo = ({label} : {label: string}) => {
    return <LoadingIndicator type="dot-circle" size="md" label={label} />;
};

export const ThreeDotsLoader = ({label} : {label: string}) => {
    return <LoadingIndicator type="dot-circle" size="md" label={label} />;
};

export const ThreeDotsLoaderSmall = ({label} : {label: string}) => {
    return <LoadingIndicator type="dot-circle" size="sm" label={label} />;
};
