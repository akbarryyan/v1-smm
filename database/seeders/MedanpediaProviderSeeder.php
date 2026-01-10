<?php

namespace Database\Seeders;

use App\Models\Provider;
use Illuminate\Database\Seeder;

class MedanpediaProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Provider::updateOrCreate(
            ['slug' => 'medanpedia'],
            [
                'name' => 'Medanpedia',
                'slug' => 'medanpedia',
                'api_url' => 'https://api.medanpedia.co.id',
                'api_id' => '13056',
                'api_key' => 'cv1hhz-a6ilu2-k4miuc-xhyd9m-y24fsk',
                'status' => 'offline',
                'is_active' => true,
            ]
        );

        $this->command->info('Medanpedia provider created successfully!');
        $this->command->info('API URL: https://api.medanpedia.co.id');
        $this->command->info('API ID: 13056');
    }
}
