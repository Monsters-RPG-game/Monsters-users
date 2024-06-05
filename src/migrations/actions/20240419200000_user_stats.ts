import Profile from '../../modules/profile/model';
import StatsRooster from '../../modules/stats/rooster';

export default {
  async up(): Promise<number> {
    const toChange = await Profile.find({ stats: { $exists: false } }).lean();
    let counter: number = 0;
    await Promise.all(
      toChange.map(async (e) => {
        const statsId = await new StatsRooster().addDefault({ owner: e.user });
        await Profile.updateOne({ _id: e._id }, { stats: statsId });
        counter++;
      }),
    );
    return counter;
  },

  async down(): Promise<void> {
    await Profile.updateMany({}, { $unset: { stats: 1 } });
  },
};
