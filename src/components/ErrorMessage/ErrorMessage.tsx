import React from "react";

function ErrorMessage(props: any) {
  return (
    <div className="text-sm text-red-500">
      {props.error ? props.error : null}
    </div>
  );
}

export default ErrorMessage;
