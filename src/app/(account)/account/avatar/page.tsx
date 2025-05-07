import Button from "@/components/basics/buttons/Button";
import TextField from "@/components/basics/forms/TextField";
import Tabs from "@/components/basics/Tabs";
import AvatarGrowthCarousel from "@/components/pages/account/avatar/AvatarGrowthCarousel";

function AvatarPage() {
  return (
    <section className="container px-4 mx-auto pt-6 pb-8 flex lg:flex-row flex-col gap-6">
      <div className="bg-card lg:w-4/12 p-4 rounded-xl">
        <Tabs
          initialTab={'male'}
          tabItemClassName="basis-1/3"
          tabs={[{
            tab: 'male',
            label: `Cowok`,
            content: (
              <AvatarGrowthCarousel
                className="-mx-4"
                images={[{
                  src: `/assets/images/avatars/male/male-1.png`,
                  alt: "Avatar Male - 1",
                }, {
                  src: `/assets/images/avatars/male/male-2.png`,
                  alt: "Avatar Male - 2",
                }, {
                  src: `/assets/images/avatars/male/male-3.png`,
                  alt: "Avatar Male - 3",
                }, {
                  src: `/assets/images/avatars/male/male-4.png`,
                  alt: "Avatar Male - 4",
                }, {
                  src: `/assets/images/avatars/male/male-5.png`,
                  alt: "Avatar Male - 5",
                }]}
              />
            ),
          }, {
            tab: 'female',
            label: `Cewek`,
            content: (
              <AvatarGrowthCarousel
                className="-mx-4"
                images={[{
                  src: `/assets/images/avatars/female/female-1.png`,
                  alt: "Avatar Female - 1",
                }, {
                  src: `/assets/images/avatars/female/female-2.png`,
                  alt: "Avatar Female - 2",
                }]}
              />
            ),
          }, {
            tab: 'hijab',
            label: `Hijab`,
            content: (
              <AvatarGrowthCarousel
                className="-mx-4"
                images={[{
                  src: `/assets/images/avatars/hijab/hijab-1.png`,
                  alt: "Avatar Hijab - 1",
                }, {
                  src: `/assets/images/avatars/hijab/hijab-2.png`,
                  alt: "Avatar Hijab - 2",
                }]}
              />
            ),
          }]}
        />
      </div>

      <div className="bg-card flex-1 p-4 rounded-xl">
        <h1 className="text-xl font-bold">
          {`Menjadi Pejuang di Berkarir ASN`}
        </h1>

        <div className="flex flex-col gap-2 mt-4">
          {[{
            label: `Nama Lengkap`,
            placeholder: `Tulis nama lengkap kamu...`,
            field: `name`,
          }, {
            label: `Email`,
            placeholder: `Tulis alamat email kamu...`,
            field: `email`,
          }, {
            label: `No. Telepon/WhatsApp`,
            placeholder: `Tulis no. telepon/WhatsApp`,
            field: `phone`,
          }, {
            label: `Gender`,
            placeholder: `Pilih gender`,
            field: `gender`,
          }].map((item) => (
            <TextField
              key={item.field}
              label={item.label}
              name={item.field}
              placeholder={item.placeholder}
            />
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            className="!rounded-lg"
            color="primary"
          >
            {`Simpan`}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AvatarPage;
