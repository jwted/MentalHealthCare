const Diary = require("../Models/Diarios/Diario");

//DONE
exports.getUserDiaries = async (req, res) => {
  const { offset, length, diary } = req.query;
  try {
    let query = {
      where: {
        userId: req.params.userId,
      },
    };
    if (offset && length) {
      query.offset = parseInt(offset);
      query.limit = parseInt(length);
    }
    if (diary) {
      query.where.id = diary.split(",");
    }
    const diaries = await Diary.findAll(query);
    if (diaries) {
      res.status(200).send({
        message: "Sucessfully found diaries",
        content: diaries,
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.createDiary = async (req, res) => {
  const { pensamentos, sentimentos, conquistas, outrasObservacoes } = req.body;
  try {
    const diary = await Diary.create({
      userId: res.locals.userId,
      pensamentos: pensamentos,
      sentimentos: sentimentos,
      conquistas: conquistas,
      outrasObservacoes: outrasObservacoes,
    });

    if (diary) {
      res.status(201).send({
        message: "Diary created successfully",
        content: diary,
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.getDiary = async (req, res) => {
  const { diaryId } = req.params;
  try {
    const diary = await Diary.findOne({
      where: {
        id: diaryId,
        userId: res.locals.userId,
      },
    });
    if (diary) {
      return res.status(200).send({
        message: "Diary found successfully",
        content: diary,
      });
    }
    return res.status(404).json({
      error: "Diary not found",
    });
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

//DONE
exports.updateDiary = async (req, res) => {
  const { diaryId } = req.params;
  const { pensamentos, sentimentos, conquistas, outrasObservacoes } = req.body;
  try {
    const diary = await Diary.findOne({
      where: {
        id: diaryId,
        userId: res.locals.userId,
      },
    });
    if (diary) {
      diary.update({
        pensamentos: pensamentos,
        sentimentos: sentimentos,
        conquistas: conquistas,
        outrasObservacoes: outrasObservacoes,
      });
      res.status(200).send({
        message: "Diary updated successfully",
        content: diary,
      });
    } else {
      return res.status(404).json({
        error: "Diary not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};

exports.deleteDiary = async (req, res) => {
  const { diaryId } = req.params;
  try {
    const diary = await Diary.findOne({
      where: {
        id: diaryId,
        userId: res.locals.userId,
      },
    });
    if (diary) {
      diary.destroy();
      res.status(204).send({
        message: "Diary deleted successfully",
      });
    } else {
      return res.status(404).json({
        error: "Diary not found",
      });
    }
  } catch {
    return res.status(500).json({
      error: "Something went wrong. Please try again later",
    });
  }
};
