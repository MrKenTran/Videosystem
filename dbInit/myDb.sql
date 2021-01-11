-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: 07. Mai, 2020 10:36 AM
-- Tjener-versjon: 10.4.12-MariaDB-1:10.4.12+maria~bionic
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `myDb`
--
CREATE DATABASE IF NOT EXISTS `myDb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `myDb`;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `owner` bigint(20) NOT NULL,
  `video` bigint(20) NOT NULL,
  `content` varchar(128) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `contents`
--

CREATE TABLE `contents` (
  `id` bigint(20) NOT NULL,
  `place` int(11) NOT NULL,
  `playlist` bigint(20) NOT NULL,
  `video` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `playlists`
--

CREATE TABLE `playlists` (
  `id` bigint(20) NOT NULL,
  `owner` bigint(20) NOT NULL,
  `title` varchar(128) COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `thumbnail` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) NOT NULL,
  `playlist` bigint(20) NOT NULL,
  `owner` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `uname` varchar(64) NOT NULL,
  `type` enum('student','teacher','admin') NOT NULL DEFAULT 'student',
  `pwd` varchar(130) NOT NULL,
  `avatar` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `user`
--

INSERT INTO `user` (`id`, `uname`, `type`, `pwd`, `avatar`) VALUES
(3, 'admin@ntnu.no', 'admin', '21232f297a57a5a743894a0e4a801fc3', 0x89504e470d0a1a0a0000000d494844520000005000000024080200000091c02a2d000000097048597300000ec400000ec401952b0e1b00000adb4944415468deed59598f1cd7753e77ab7de9aa5ea767913833a4285a941c47f183e024301040b6603fe431ffc2bfc3c83fc81fc8930cc308826c306208b00cc31215899c2187d4c22167ba7b7a99dab7bbe4a147430ea72d5931ec08a60f0ad5d5857b0a75ee39e7fbbe7b0bfdc38ffef1ee6713786e8c020002f4fc048c0100409d1f6bdd1023b04d7df937f05d82d1f23af49d96ebb45bae679b4fbb5c3eceddbf86077d6602fefeefbef3f35ffefae64b3b524196e7ebfdee68322d1ae1182c4a0bdbb603d7ca8bb2a86adfb1deb975f7afffe27a9ce6fd6ef8f0e8b8e5b7b0e49ee7e745fecffffa0ba9d4d7b4a4953a2b6984e027fff90ec1e8fdfd8f07610b53f2abffd9af1b6e1afa61512659a100765fd8c04a9c9c26085494a4bff8cd6ddbd004a0d96972389a3342281b97550d80be96f1028aa2d871ece708b4100284d07386d2bf25602104001042ceef48290121fcdbc72f07374d4328c55f7d1e6bce0f178902a8ca52d3750000a5cab2d40d1d230200bca976d77a14e3a7bda6693e8af3a6a9196300a0940200ce39650c01280416653bddd6d33dac0060ffa30f86575edafbe85612c784699b1b1bf7ee1d70d15886f937dffdeebfffcbcffc766f363ea276cba2ca09bad174d45ddb4a4e675114b99e5fd755cb734e1649e059fb7b7bfdcdedebbb57b6b7b7bf62c022a905023599ce932896925b8eaba42c8bf2cace8e2a73d6e4b1a583528c315dd719634a292e9490303a3e4ae21463bc04232104af1bcdd0c36e6fd0efabcf1105c571ec380e00d475a5d49281402ac5289552492994524a294629c258708e3069ea324ab2306831c638e78460ce05c6981052370da394370d20ac690c5f4cc5975a56d5b70f47573abe651a9721efc1d178369b858c98869e655914454208cef9f62bafee7ffcf0dbaf7ec3d2295cd214d3acaa847cb91f3c5bd2659e575c8d4747ed3048b26232196f0ed7ca9a0fd606f3d91c40cd67b32bdbdb49122b40699ad6451e743ad3939320080e47c7495186ad40f25a21ec39de6c31b54cdbd028a5ac6eb86d1a699ebbba76f8e828085a0821c6d8e6e6e6e59849ba4899fce0bd07ed76673a9deaba0e008cd15eaf1ff821d2adebbd4067676caa9442088de2f4852b3b96a6e90429b83051081023b812f2bc6d9ff0709a6596e37a9e371e8d0ccb09c330cbb2e1e60bd1625156959242816a1a8e119ace168490a22a691c8d27279d4e47d3b49d6e6f1ec5ebfd7e5696a7491afaad34cf4bc9d332b12d1363e4da76536408a1f178d26eb75dd75d9964e90486690cd6d76d3fe86e6c02809252d3752565252e710c4200c08bbc8866d076a552efbefb6e1884f3c5dcf7fd200886c3e14a1e5600e0793ed37505a0dbb6ef3a55d598baa60074bd1f48e95ad6b94f6fb0a66b5a96e71a631b1b9b4dd3bcbc7b1500d6ba5d000800faed66891f4b8ba2c8f77d000068af6f6c9ddf57ab985ab36cd7b32a294f4f4fcbaa984fa794314d33fc76dbf503b5ca51498179850030c26fbcf1c679e69552a09602eb89cb9392ced2241a4fa671b488e3edad8dc3a371e0bb47e3b1a6198c2005980b5e95a5633baee3b46df3c30f3f6c1a6e5976a7db05d18ca73300a8cba2db1f8c8e472f5dbbbab7771b88deefb60180373560ba7365ebfd5b1ff607fdd3f98c30fd7b6fbe49295991640514a1e1c6e6747a62983628657baeebba07070f8059918e344a1f3e7c9824c98d1b37104279a36add912015c24a2a84904248012084d4c55ab8005a2bade19c517af97a6955552d7b6c699c73faf980e5751cc79ee77d25d0ba3f4b30a82c4b5de789e36c7c14eaa4d03dddd0aff7028d92388eabaaea76bb00308ef37152e80c51443eb97fb07df5ead2abc873d3b2f286138c2f80d61906dedbc7ba5366a78b28f55cb7c892de60edf8782444a3e906c6a4c892c170a3ae4ace9b248afcb09344a79832db342693c9f6cecee1e12165ace5b73cd71e4da604a9f922da7e712bceab245a98869666e55fbefeba6d995f10b3924200082eeba621842880b22c6a21934a990e3b87a4cbf3583612409a41b0c8322984a61b495608ca94028257098fedabd74e4f6361e9adb063996655168eeb59b62d39d70da32a4b40eb8cd1aaaad234219874bb5d82717fd0afcad26fb57cdfc718534ab32c773d8f6906a3240813df73bd0097614b29394004c19708bb248ac7478fa5929a6e6cef5e45008f1f7ed6d4756eda5b9db385ecca272cef29098be96c3a196d6def2ebb175d747992e193939320681f4dc6719abde0d80597c562b11c28eada344d4c88e05cb7ac06c0309aaaaed7876b943125a5e7fb65590641abaa6a42282134cfe7ad20f47d9f12345d2404c94ea79b675974ba1052f2a6362dcb348ccbef6d1bdafa709016557f3804404aa9562b9442d44dcd9b46d3b52f581700c0c964241a4ea8f6c9bd7b9dc1c0f3fd6798f9094a8352c7a35152e4655d4d178be9221af63a9f3e7a6418a6109c5296661942c8b1acb01558ba311a8d3efdf86073ebc5bdfd7baf7feb9b77eedce652f5da8122fafdfbf75cd7ddbb7377b8b9ee59c6debd4f06fd769aa6a3d1c95a2f1c4d4e16f3f92bafbc623cd5ff4f7858710ad23a8315851074fabd0707073bbb57cfdf7c25bc23a408421b1b1be790f4e0fe7d8a9190175c501cc7cf50a2522acb324dd30060795e2c164170d6f445510000c108538d120c008f1f3f765dd7f3bcaf0a51972d2dabfbb378e0188e46115aca3e049fffcc8b6a9ed74f0b8fa58da26c9c147d4ff775561445555508218491a1eb9aae47259fe7f58d41f86c492fededb7dffee15b6ffedb7ffc97cef060b04e089a4ea7a78b851ff8ba665926bbb37fbfe55a755d5dbbf16abc987e74fbce647e1a7a0e529c4bfcd60f7e786d77fbf75bcf208a719ac407070761184ea753828902f5da6bafd12f14aa1830025416e578325e2a39cbb20683c133fdfe25b4b48224a5c4182fcf4bfa21942280a669ce172b4f83caf9c8df9d96029d59da0a7e8eab3aadc592969ebebfa4259361739557514baed40a2d7d9ee1b7beffe6cffffb1dc7b26cdbccd2244acb97af5fbdf5de6f2aaeae5fdb9d45b9c190a1d1d1340a5bf6c1feddf670ebc6b59dbb77ef5a96290125d1a9ce686ffdc5c9d1e1f6eeeeadf7dff3fdd6c670edf078229b926ae6daa077f3e6cd95016b94fa069300692356e41053dfa494e06750dad2a9c7190070b9e2998c6287920bc2e3b2ac5d2ce6a6693146cbb2a2942e651a6f1aca18c65808c128ad9b8652ca39078434c638e70863210446089422944a2110c6524a008509e54d8310c2182febedff6d8b6765c07fe23b1e679db0776086617e7252c4a9e6ba76cb4bc6933cce8137ccb6056fc2cdb5e46441182ee7b1d16e630cbcac9a34a91af07aa1d3f6a3c723a08c690c1152c60961cc0afdf878acbb5e95c44ca36556f55eda891e3dcea7f1e05b2f8f3eb8e3f4bae569acd926d1755e949bafbf4a18fd836778095a55924aa178592aa5249776a7954e66baefd6710298604a34cb140d5fca724018a450004d5e50dd203aaba2d8f0bd2acd10c258a3a26e10c6ba6d2929a510bcae11a0a62ccda0a504af92dc0afd3a2b8a28317db78c13bbdbc1189865fdf1027eaebe3cc09f03fe73c0cfc3bef49f66c03ffea79f3e9ac4cf51c00f0ec76529aaba3134463016520a2128255241d3708c91c66855370a8060ac94920a665152af54715f3f1bfade22cb2a21cf565ee8aca44148f9d968fe477b0fdbd4104279594bf97ffcc4f857dfd860ab36009f314b6365c39f5e45535ee59f1e4e2f6af433752e9554f20ff2cd334d0bf8fd1efcb737b77cd74ed2ba286ac364455e7bae51140d97e03ada70e8afd82d534a08f1bf59f706a8057f2d130000000049454e44ae426082);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) NOT NULL,
  `owner` bigint(20) NOT NULL,
  `title` varchar(128) COLLATE utf8_bin NOT NULL,
  `course` varchar(128) COLLATE utf8_bin NOT NULL,
  `topic` varchar(128) COLLATE utf8_bin NOT NULL,
  `mime` varchar(128) COLLATE utf8_bin NOT NULL,
  `size` int(11) NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `likes` bigint(20) NOT NULL,
  `thumbnail` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `video` (`video`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlist` (`playlist`),
  ADD KEY `video` (`video`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `playlist` (`playlist`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`video`) REFERENCES `videos` (`id`);

--
-- Begrensninger for tabell `contents`
--
ALTER TABLE `contents`
  ADD CONSTRAINT `contents_ibfk_1` FOREIGN KEY (`playlist`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `contents_ibfk_2` FOREIGN KEY (`video`) REFERENCES `videos` (`id`);

--
-- Begrensninger for tabell `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);

--
-- Begrensninger for tabell `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`playlist`) REFERENCES `playlists` (`id`);

--
-- Begrensninger for tabell `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);
COMMIT;
