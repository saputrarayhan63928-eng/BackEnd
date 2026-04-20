import type { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export class ProductRepository {
  async findAll(
    skip: number,
    take: number,
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput,
  ) {
    return prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { category: true },
    });
  }

  async countAll(where: Prisma.ProductWhereInput) {
    return prisma.product.count({ where });
  }

  async findById(id: number) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async softDelete(id: number) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findComplex(categoryName: string, maxPrice:number) {
    return await prisma.product.findMany({
        where:{
            OR:[
                {
                    AND: [
                        {category: {name: categoryName}},
                        {price: {lt: maxPrice}}
                    ]
                },
                {category: {name: 'Aksesoris'}}
            ]
        }
    });
  }

  async getStatistics(){
    return await prisma.product.aggregate({
        _count:{ id: true}, // Total jumlah roduct
        _avg:{price:true}, // Rata - Rata harga
        _sum:{stock: true}, // Total stok semua barang
        _min:{price:true}, // Harga termurah
        _max:{price:true} // Harga termahal
    })
  }

  async getProductsByCategotyStats(){
    return await prisma.product.groupBy({
        by: ['categoryId'],
        _count:{id:true},
        _avg:{price:true}
    })
  }

}
