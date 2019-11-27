const filenames = [
  "koch_pinwheels.json",
  "koulakov_chklovskii_wiring_cost.json",
  "livingstone_hubel_color.json",
  "nauhaus_orthogonality.json",
  "ponce_livingstone_super_stimuli.json",
  "ringach_orientation_selectivity.json",
  "hubel_wiesel_v2v3.json",
  "dicarlo_untangling.json",
  "olshausen_field_sparse_coding.json",
  "kriegeskorte_monkey_human.json",
  "grill_spector_functional_architecture.json",
  "devalois_direction_selectivity.json",
  "ackman_retinal_waves.json",
  "afraz_inactivation_face_gender.json",
  "rajalingham_inactivation.json",
  "bracci_ventral_shape.json",
  "jacobs_jordan_short_connections.json",
  "weliky_katz_disruption.json",
  "garg_color_orientation.json",
  "kim_pasupathy_texture_shape_v4.json",
  "haxby_hyperalignment.json",
  "sato_mosaic.json",
  "arcaro_universal_mechanisms.json",
  "op_de_beeck_factors.json",
  "jang_orientation_classification.json",
  "ohki_pinwheel_order.json",
  "chapman_orientation_development.json",
  "fahey_mouse_global_orientation.json",
  "otoole_face_dcnn.json",
  "durbin_mitchison_som.json",
  "linsker_spatial_opponent.json",
  "khalig-razavi_dnn.json",
  "gunthner_divisive_normalization.json",
  "kietzmann_recurrence_rda.json",
  "datta_computational_neuroethology.json",
  "bartoldson_pruning.json",
  "devalois_spatial_frequency.json",
  "zhuang_local_aggregation.json",
  "smith_v1_correlations.json",
  "arcaro_body_protomap.json",
  "dahne_retinal_wave_sfa.json"
];

const filenames_with_prefix = filenames.map(filename => {
  return "review_jsons/" + filename;
});

export default filenames_with_prefix;
