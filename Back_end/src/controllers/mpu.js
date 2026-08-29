import { PrismaClient } from "@prisma/client";

const orm = new PrismaClient();

// index / menampilkan semua data
const index = async (req, res, next) => {
    try {
      const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;
      const row_count = await orm.mpu.count();
      const offset = page * 5;
  
      const rec = await orm.mpu.findMany({
        orderBy: { id: "desc" },
        skip: offset,
        take: 5,
        select: {
          id: true,
          mean_x: true,
          mean_y: true,
          mean_z: true,
          classification: true,
          createdAt: true,
          updatedAt: true,
          chip: {
            select: {
              id: true,
              nama_domba: true,
              jenis_kelamin: true,
            },
          },
        },
      });
  
      const formattedData = rec.map((data) => {
        return {
          id: data.id,
          mean_x: parseFloat(data.mean_x),
          mean_y: parseFloat(data.mean_y),
          mean_z: parseFloat(data.mean_z),
          classification: data.classification,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          chip_id: data.chip.id,
          nama_domba: data.chip.nama_domba,
          jenis_kelamin: data.chip.jenis_kelamin,
        };
      });
  
      console.log('Formatted Data:', formattedData); // Add this line
  
      return res.status(200).json({
        message: "success",
        pagination: {
          totalPages: Math.ceil(Number(row_count) / 5),
          currentPage: page + 1,
        },
        data: {
          count: row_count,
          rows: formattedData,
        },
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

// graph / menampilkan data terbaru untuk grafik
const graph = async (req, res, next) => {
    try {
        const chip_id = String(req.query.chip_id);
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;
        const row_count = await orm.mpu.count({ where: { chip_id: chip_id } });
        const offset = page * 5;

        const rec = await orm.domba.findMany({
            where: { id: chip_id },
            select: {
                mpu: {
                    orderBy: { id: "desc" },
                    skip: offset, take: 5,
                    select: {
                        id: true,
                        mean_x: true,
                        mean_y: true,
                        mean_z: true,
                        classification: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        });

        const formattedData = rec.flatMap(data =>
        (data.mpu.map(mpu =>
        ({
            id: mpu.id,
            mean_x: parseFloat(mpu.mean_x),
            mean_y: parseFloat(mpu.mean_y),
            mean_z: parseFloat(mpu.mean_z),
            classification: mpu.classification,
            createdAt: mpu.createdAt,
            updatedAt: mpu.updatedAt,
        })
        ))
        );

        return res.status(200).json({
            message: "success",
            pagination: {
                totalPages: Math.ceil(Number(row_count) / 5),
                currentPage: page + 1
            },
            data: {
                count: row_count,
                rows: formattedData
            }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// show / menampilkan data berdasarkna id
const show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rec = await orm.mpu.findFirst({ where: { id: Number(id) }, include: { chip: true } });

        const data = {
            id: rec.id,
            mean_x: parseFloat(rec.mean_x),
            mean_y: parseFloat(rec.mean_y),
            mean_z: parseFloat(rec.mean_z),
            classification: rec.classification,
            createdAt: rec.createdAt,
            updatedAt: rec.updatedAt,
            chip_id: rec.chip_id,
            nama_domba: rec.chip.nama_domba,
            jenis_kelamin: rec.chip.jenis_kelamin
        }

        return res.status(200).json({
            message: "success",
            data
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// membuat data mpu badan baru
const create = async (req, res, next) => {
    try {
        const payload = req.body;
        const time = Date.now();
        const currentDate = new Date(time).toISOString();

        // Find the sensor with nama_sensor "mpu"
        const mpu = await orm.sensor.findFirst({ where: { nama_sensor: "mpu" }, select: { id: true } });

        // Validate if the sensor exists
        if (!mpu) {
            return res.status(404).json({ error: "Sensor with nama_sensor 'mpu' not found" });
        }

        // Validate if the chip_id exists
        const chip = await orm.domba.findFirst({ where: { id: payload.chip_id }, select: { id: true } });
        if (!chip) {
            return res.status(404).json({ error: `Chip with id '${payload.chip_id}' not found` });
        }

        const newBody = {
            mean_x: payload.mean_x,
            mean_y: payload.mean_y,
            mean_z: payload.mean_z,
            classification: payload.classification,
            chip_id: payload.chip_id,
            sensor_id: mpu.id,
            createdAt: currentDate,
            updatedAt: currentDate,
        };

        const data = await orm.mpu.create({ data: newBody });

        return res.status(200).json({
            message: "success",
            data
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// membuat data mpu badan baru
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const time = Date.now();
        const currentDate = new Date(time).toISOString();
        const mpu = await orm.sensor.findFirst({ where: { nama_sensor: "mpu" }, select: { id: true } });

        const updatedBody = {
            mean_x: payload.mean_x,
            mean_y: payload.mean_y,
            mean_z: payload.mean_z,
            classification: payload.classification,
            chip_id: payload.chip_id,
            sensor_id: mpu.id,
            createdAt: currentDate,
            updatedAt: currentDate,
        }
        const data = await orm.mpu.update({
            where: { id: Number(id) },
            data: updatedBody
        });
        return res.status(200).json({
            message: "success",
            data
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// destroy / menghapus data berdasarkan id
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orm.mpu.delete({ where: { id: Number(id) } });

        return res.status(200).json({
            message: "MPU entry deleted successfully",
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export default {
    index,
    graph,
    show,
    create,
    update,
    destroy
}
