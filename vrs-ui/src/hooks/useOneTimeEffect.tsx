import { Ref, useEffect, useRef } from "react";


const useOneTimeEffect = (action: () => true | false, dependencies: Ref<unknown>[],) => {
    const ref = useRef(false);

    useEffect(() => {
        if (!ref.current) {
            ref.current = action();
        }
    }, [...dependencies, action])
}
 
export default useOneTimeEffect;