const Table = require('../models/Table');

// [ANGGOTA 5] GET semua meja
const getAllTables = async (req, res) => {
  try {
    const { status, location } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (location) filter.location = location;

    const tables = await Table.find(filter).sort('table_number');
    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [ANGGOTA 5] POST tambah meja baru
const createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Meja berhasil ditambahkan',
      data: table,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PATCH update status meja (bonus)
const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!table) {
      return res.status(404).json({ success: false, message: 'Meja tidak ditemukan' });
    }
    res.status(200).json({
      success: true,
      message: 'Status meja berhasil diupdate',
      data: table,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllTables, createTable, updateTableStatus };
