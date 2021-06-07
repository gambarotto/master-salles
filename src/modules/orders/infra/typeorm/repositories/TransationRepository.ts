/**
 *     const products = await getManager().transaction(
      async transactionalEntityManager => {
        console.log('oooi');

        const prds = await transactionalEntityManager.find(Product);
        const usrs = await transactionalEntityManager.find(User);

        return { products: prds, users: usrs };
      },
    );
 */
