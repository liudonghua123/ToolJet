import { DataQuery } from 'src/entities/data_query.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillDataSources1667076251897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;

    const versions = await entityManager
      .createQueryBuilder()
      .select()
      .from('app_versions', 'app_versions')
      .getRawMany();

    for (const version of versions) {
      let runjsDS, restapiDS;
      for await (const kind of ['runjs', 'restapi']) {
        const dataSourceResult = await queryRunner.query(
          'insert into data_sources (name, kind, app_version_id, app_id) values ($1, $2, $3, $4) returning "id"',
          [`${kind}default`, `${kind}default`, version.id, version.app_id]
        );

        if (kind === 'runjs') {
          runjsDS = dataSourceResult[0].id;
        } else {
          restapiDS = dataSourceResult[0].id;
        }
      }

      const dataQueries = await queryRunner.query(
        'select kind, id from data_queries where data_source_id IS NULL and app_version_id = $1',
        [version.id]
      );

      for await (const dataQuery of dataQueries) {
        await entityManager
          .createQueryBuilder()
          .update(DataQuery)
          .set({ dataSourceId: dataQuery.kind === 'runjs' ? runjsDS : restapiDS })
          .where({ id: dataQuery.id })
          .execute();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
