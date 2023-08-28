import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Label} from "@app/common";
import {LabelsController} from "./labels.controller";
import {LabelsService} from "./labels.service";

@Module({
    controllers: [LabelsController],
    providers: [LabelsService],
    imports: [
        TypeOrmModule.forFeature([Label]),
    ],
    exports: [LabelsService]
})

export class LabelModule {
}