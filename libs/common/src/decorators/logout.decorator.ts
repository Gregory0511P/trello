import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Logout = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        //const res = context.switchToHttp().getResponse();
        const auth = req.headers.authorization;
        req.headers.authorization = "";
        return auth;
    }
)