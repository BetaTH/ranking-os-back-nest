-- CreateTable
CREATE TABLE "operador_tb" (
    "id" SERIAL NOT NULL,
    "operador" TEXT NOT NULL,

    CONSTRAINT "operador_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zona_tb" (
    "id" SERIAL NOT NULL,
    "zona" TEXT NOT NULL,

    CONSTRAINT "zona_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipes_tb" (
    "id" SERIAL NOT NULL,
    "equipe" TEXT NOT NULL,
    "linkFoto" TEXT NOT NULL DEFAULT '',
    "transportePadrao" TEXT NOT NULL,

    CONSTRAINT "equipes_tb_pkey" PRIMARY KEY ("equipe")
);

-- CreateTable
CREATE TABLE "transporte_tb" (
    "id" SERIAL NOT NULL,
    "transporte" TEXT NOT NULL,

    CONSTRAINT "transporte_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_os_tb" (
    "id" SERIAL NOT NULL,
    "tipoOS" TEXT NOT NULL,
    "pontos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tipo_os_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxa_tb" (
    "id" SERIAL NOT NULL,
    "taxa" TEXT NOT NULL,

    CONSTRAINT "taxa_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "os_tb" (
    "idOS" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "operador" TEXT NOT NULL,
    "tipoOS" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "equipe" TEXT NOT NULL,
    "transporte" TEXT NOT NULL,
    "dataEdicao" TIMESTAMP(3) NOT NULL,
    "dataInsercao" TIMESTAMP(3) NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "dataFechamento" TIMESTAMP(3) NOT NULL,
    "taxa" TEXT NOT NULL DEFAULT 'Não',
    "correcao" TEXT NOT NULL DEFAULT 'Não',
    "trs" TEXT NOT NULL,
    "trsMin" INTEGER NOT NULL,
    "pontos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "os_tb_pkey" PRIMARY KEY ("idOS")
);

-- AddForeignKey
ALTER TABLE "os_tb" ADD CONSTRAINT "os_tb_equipe_fkey" FOREIGN KEY ("equipe") REFERENCES "equipes_tb"("equipe") ON DELETE RESTRICT ON UPDATE CASCADE;
