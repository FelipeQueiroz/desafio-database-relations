import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddOrderIdToOrdersProducts1603679623401
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductsOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders_products', 'order_id');
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
  }
}
