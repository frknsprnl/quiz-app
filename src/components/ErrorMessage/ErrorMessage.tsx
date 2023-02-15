import React from "react";

function ErrorMessage(props: any) {
  return (
    <div className="text-sm text-red-500 pb-1.5 px-2">
      {props.error ? props.error : null}
    </div>
  );
}

export default ErrorMessage;
