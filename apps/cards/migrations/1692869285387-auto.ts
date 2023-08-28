import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1692869285387 implements MigrationInterface {
    name = 'Auto1692869285387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "file_path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cardId" integer, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cardId" integer, "childrenId" integer, "parentIdId" integer, "attachmentIdId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labels" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "color" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cardId" integer, CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "check_list_item" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "checkListId" integer, CONSTRAINT "PK_40b42a63be81504a4f0842c0631" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "check_lists" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "cardId" integer, CONSTRAINT "PK_63fb5f5cb0969398d1c5fc7be7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "users_watch" text NOT NULL DEFAULT '', "title" character varying NOT NULL, "description" character varying, "dueDate" TIMESTAMP, "coverImage" character varying, "archived" boolean NOT NULL DEFAULT false, "position" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "listId" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, "position" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "boardId" integer, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_user" ("id" SERIAL NOT NULL, "card_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_00ec72ad98922117bad8a86f980" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_51fb93b632faa631184219b3ed7" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2485e086f1e1005ea3ed0987b82" FOREIGN KEY ("childrenId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_aeb1ce7ebe8b013f39b7b8adc6b" FOREIGN KEY ("parentIdId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_3f2222a713879ca6b1876bfe251" FOREIGN KEY ("attachmentIdId") REFERENCES "attachments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_ff4ad3c58579e5e96f9c8057344" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "check_list_item" ADD CONSTRAINT "FK_28490f274752a6a7cc13f5d0019" FOREIGN KEY ("checkListId") REFERENCES "check_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "check_lists" ADD CONSTRAINT "FK_643139005ce7841afb3c7ea47e7" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_05460f5df61d54daeaf96c54c00" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_05460f5df61d54daeaf96c54c00"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9"`);
        await queryRunner.query(`ALTER TABLE "check_lists" DROP CONSTRAINT "FK_643139005ce7841afb3c7ea47e7"`);
        await queryRunner.query(`ALTER TABLE "check_list_item" DROP CONSTRAINT "FK_28490f274752a6a7cc13f5d0019"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_ff4ad3c58579e5e96f9c8057344"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_3f2222a713879ca6b1876bfe251"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_aeb1ce7ebe8b013f39b7b8adc6b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2485e086f1e1005ea3ed0987b82"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0"`);
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_51fb93b632faa631184219b3ed7"`);
        await queryRunner.query(`DROP TABLE "card_user"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "check_lists"`);
        await queryRunner.query(`DROP TABLE "check_list_item"`);
        await queryRunner.query(`DROP TABLE "labels"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
    }

}
